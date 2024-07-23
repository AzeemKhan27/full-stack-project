import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.model.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import  jwt  from "jsonwebtoken"
import { uploadOnCloudinary } from "../utils/cloudinary.utils.js";
import {generateOtp, sendOtpEmail} from "../utils/generateOtp_utils.js"


// making method for generate and refresh tokens because it will increase reusability of code.
const generateAccessAndRefreshToken = async(userId) => {
    try {   
        const user = await User.findById(userId);
       
        const accessToken = await user.generateAccessToken()    //generateAccessToken() and generateRefreshToken() defined in user model.
    
        const refreshToken = await user.generateRefreshToken()  //generateRefreshToken we can save in DB.

        user.refreshToken = refreshToken;
       
        await user.save({ validateBeforeSave : false })

        return { accessToken, refreshToken }

    } catch (error) {
        return res.status(500).json(new ApiError(500,error,"Something went wrong while generating access and refresh token."))
    }
};

// Register and Send OTP API
const registerAndSendOtp = asyncHandler(async (req, res) => {
    const { email, username } = req.body;

    console.log("Register BODY: ",req.body);

    if (!email || !username) {
        return res.status(400).json(new ApiError(400, {}, "Email and username are required."));
    }

    let user = await User.findOne({ email });

    if (!user) {
        user = new User({ email, username });
        await user.save();
    } else if (user.username !== username) {
        return res.status(400).json(new ApiError(400, {}, "Username does not match with the existing email."));
    }

    const otp = generateOtp();
    user.otp = otp;
    user.otpExpiry = Date.now() + 10 * 60 * 1000; // OTP valid for 10 minutes
    await user.save();

    await sendOtpEmail(email, otp);

    return res.status(200).json(new ApiResponse(200, { email }, "OTP sent successfully"));
});

// Verify OTP and Login API
const verifyOtpAndLogin = asyncHandler(async (req, res) => {
    const { email, otp } = req.body;

    if (!email || !otp) {
        return res.status(400).json(new ApiError(400, {}, "Email and OTP are required."));
    }

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(401).json(new ApiError(401, {}, "User not found."));
    }

    if (user.otp !== otp || user.otpExpiry < Date.now()) {
        return res.status(401).json(new ApiError(401, {}, "Invalid or expired OTP."));
    }

    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    const { refreshToken, accessToken } = await generateAccessAndRefreshToken(user._id);

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken -otp -otpExpiry");

    const options = {
        httpOnly: true,
        secure: true,
    };

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(200, {
                user: loggedInUser,
                accessToken,
                refreshToken,
            }, "User Logged In Successfully")
        );
});

const registerUser = asyncHandler( async (req,res) => {

    const {username,email,fullName,password} = req.body;

    if([username,email,fullName,password].some((field) => field?.trim() === "")){
        return res.status(400).json(new ApiError(400,{},"All field are required."))
    }

    const existingUser = await User.findOne({
        $or:[{username},{email}]
    });


    if(existingUser){
        return res.status(400).json(new ApiError(400,existingUser,"Username or Email already exists."))
    }


    if(!profileImageLocalPath){
        return res.status(400).json(new ApiError(400, profileImageLocalPath, "Profile Image is required."));
    }

    const profileImage = await uploadOnCloudinary(profileImageLocalPath); // sending profile url to cloudinary function.

    if(!profileImage){
        return res.status(400).json(new ApiError(400,{},"Profile Image is required."));
    }

    const user = await User.create({
        username: username.toLowerCase(),
        email,
        fullName,
        password,
        profileImage : profileImage.url || "",
    });

    const createdUser = await User.findById(user._id).select(
        "-refreshToken -password"
    );

    if(!createdUser){
        return res.status(403).json(new ApiError(403,{},"Something went wrong while registering the user."))
    }

    return res.status(201).json(new ApiResponse(201,createdUser,"User created successfully."))

});


// Login User:

// const loginUser = asyncHandler( async (req,res) => {

//     const {email, username, password} = req.body;

//     if (!username && !email) {
//         throw new ApiError(400,"username or email is required.")
//     }


//     // const user = await User.findOne({
//     //     $or:[{email},{username}]
//     // })

//     const user = await User.aggregate([
//         {
//             $match:{
//                 $or:[{email},{username}]
//             }
//         },
//         {
//             $project:{
//                 refreshToken: 0,
//                 password: 0
//             }
//         }
//     ]).then(users=>users[0]);

//     if (!user) {
//         throw new ApiError(400, "User not found");
//     }

//     const isPasswordValid = await user.isPasswordCorrect(password);

//     if(!isPasswordValid){
//         throw new ApiError(401,"Invalid user credentials.")
//     }

//     //access and refresh token method using.
//     const { refreshToken, accessToken } = await generateAccessAndRefreshToken(user._id);

//         //access and refresh token method using.
//         const { refreshToken, accessToken } = await generateAccessAndRefreshToken(user._id);

//         const loggedInUser = await User.findById(user._id).select("-password -refreshToken");
    
//         //now we are sending cookies, and set strict security setting
//         const options = {
//             httpOnly : true,    // we these options, anybody can't change cookies.
//             secure : true
//         }
    
//         console.log("refreshToken :: > ",refreshToken);
//         return res
//         .status(200)
//         .cookie("accessToken", accessToken, options)
//         .cookie("refreshToken", refreshToken, options)
//         .json(
//             new ApiResponse(200,
//                 {
//                     user: loggedInUser,
//                     accessToken,
//                     refreshToken
//                 },
//                 "User Logged In Successfully"
//                 )
//         )

// });

const loginUser = asyncHandler(async (req, res) => {
    const { email, username, password } = req.body;

    if (!username && !email) {
        return res.status(400).json(new ApiError(400, {}, "username or email is required."));
    }

    // const user = await User.aggregate([
    //     {
    //         $match: {
    //             $or: [{ email }, { username }],
    //         },
    //     },
    //     {
    //         $project: {
    //             refreshToken: 0,
    //             password: 0,
    //         },
    //     },
    // ]).then((users) => users[0]);

    const user = await User.findOne({
        $or:[{email},{username}]
    })

    if (!user) {
        return res.status(401).json(new ApiError(400, {}, "User not found"))
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
        return res.status(401).json(new ApiError(401, {}, "Invalid user credentials."))
    }

    const { refreshToken, accessToken } = await generateAccessAndRefreshToken(user._id);

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

    const options = {
        httpOnly: true,
        secure: true,
    };

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(200, {
                user: loggedInUser,
                accessToken,
                refreshToken,
            }, "User Logged In Successfully")
        );
});


//Logout User
const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset:{
                refreshToken: 1 // this removes the field from document
            }
        },
        {
            new: true
        }
    )

     //now we are sending cookies, and set strict security setting
     const options = {
        httpOnly : true,    // we these options, anybody can't change cookies.
        secure : true
    }

    return res
    .status(200)
    .clearCookie("accessToken",options)
    .clearCookie("refreshToken",options)
    .json(new ApiResponse(200,{},"User logged out successfully."))
})

const refreshAccessToken = asyncHandler(async(req,res)=>{

    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;
    
    if(!incomingRefreshToken){
       return res.status(403).json(new ApiError(403, incomingRefreshToken,"unauthorized request."))
    }

try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )
    
        const user = await User.findById(decodedToken?._id);
    
        if(!user){
            return res.status(401).json(new ApiError(401, user,"Invalid refresh token"));
        }
    
        // we check the refresh token available in db or not
        if(incomingRefreshToken !== user?.refreshToken){
            return res.status(401).json(new ApiError(401, {isRefreshTokenAvailableInDB: incomingRefreshToken !== user?.refreshToken} ,"Refresh token has expired or used."))
        }
    
        const options = {
            httpOnly : true,    // we these options, anybody can't change cookies.
            secure : true
        }
    
        const {newRefreshToken, accessToken} = await generateAccessAndRefreshToken(user._id);
    
        return res
        .status(200)
        .cookie("accessToken",accessToken, options)
        .cookie("newRefreshToken",newRefreshToken, options)
        .json(
            new ApiResponse(200,
                {
                    user: user,
                    accessToken,
                    refreshToken: newRefreshToken
                },
                "Access token refreshed successfully."
                )
        )
} catch (error) {
    return res.status(401).json(new ApiError(401, error, `Invalid refresh token || ${error.message}`));
}

})

const changePassword = asyncHandler(async(req,res,next)=>{
    // const { oldPassword, newPassword } = req.body;

    const { oldPassword, newPassword, confirmPassword } = req.body;
    if(!(confirmPassword === newPassword)){
        return res.status(401).json(new ApiError(401,{},"new and confirm password is not matching."))
    }

    const user = await User.findById(req.user?._id);
    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

    if(!isPasswordCorrect){
        return res.status(400).json(new ApiError(400,{},"Invalid old Password"))
    }

    user.password = newPassword;
    await user.save({validateBeforeSave: false});

    return res
    .status(200)
    .json(new ApiResponse(200,{},"password changed successfully."))

})

const updateUserProfileImage = asyncHandler(async(req,res,next)=>{
    const profileImageLocalPath = req.file?.path;  // this path coming from postman or client-side.

    if(!profileImageLocalPath){
        return res.status(400).json(new ApiError(400, {},"Profile Image file is missing."));
    }

    const oldprofileImagePath = req.user?.profileImage;  // this "req.user?.avatar" will be old image path.
    await deleteOldImage(oldprofileImagePath)            //deleteOldImage() := delete the old profile image file from cloudinary server.

    // upload the profile image
    const profileImage = await uploadOnCloudinary(profileImageLocalPath);

    if(!profileImage.url){
        return res.status(400).json(new ApiError(400,{}, "Error found while uploading profileImage file"));
    }

    await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set:{
                profileImage : profileImage.url
            }
        },
        {
            new: true
        }
    ).select("-password")

    return res
     .status(200)
     .json(new ApiResponse(200,user,"Profile Image updated successfully"))

});

export { 
    registerAndSendOtp,
    verifyOtpAndLogin,
    registerUser, 
    loginUser,
    logoutUser,
    refreshAccessToken,
    changePassword,
    updateUserProfileImage
}