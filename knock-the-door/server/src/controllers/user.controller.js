import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.model.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import  jwt  from "jsonwebtoken"
import { uploadOnCloudinary } from "../utils/cloudinary.utils.js"


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
        console.error("Error generating tokens METHOD : == top =>", error);
        throw new ApiError(500,"Something went wrong while generating access and refresh token.")
    }
};

const registerUser = asyncHandler( async (req,res) => {

    const {username,email,fullName,password} = req.body;

    if([username,email,fullName,password].some((field) => field?.trim() === "")){
        throw new ApiError(400,"All field are required.");
    }

    const existingUser = await User.findOne({
        $or:[{username},{email}]
    });


    if(existingUser){
        throw new ApiError(400,"Username or Email already exists.");
    }


    if(!profileImageLocalPath){
        throw new ApiError(400, "Profile Image is required.");
    }

    const profileImage = await uploadOnCloudinary(profileImageLocalPath); // sending profile url to cloudinary function.

    if(!profileImage){
        throw new ApiError(400,"Profile Image is required.");
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


    // const createdUser = await User.aggregate([
    //     {
    //         $match:{
    //             _id:user._id
    //         }
    //     },

    //     {
    //         $project:{
    //             refreshToken: 0, 
    //             password: 0 
    //         }
    //     }
    // ]).then(createdUsers => createdUsers[0]);

    if(!createdUser){
        throw new ApiError(500,"Something went wrong while registering the user.")
    }

    return res.status(201).json(
       new ApiResponse(200, createdUser, "User created successfully.")
    )

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

    console.log("CHECK Body: ", req.body)

    if (!username && !email) {
        throw new ApiError(400, "username or email is required.");
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
        throw new ApiError(400, "User not found");
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid user credentials.");
    }

    const { refreshToken, accessToken } = await generateAccessAndRefreshToken(user._id);

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

    const options = {
        httpOnly: true,
        secure: true,
    };

    console.log("refreshToken :: > ", refreshToken);
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
       throw ApiError(401,"unauthorized request.")
    }

try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )
    
        const user = await User.findById(decodedToken?._id);
    
        if(!user){
            throw new ApiError(401,"Invalid refresh token")
        }
    
        // we check the refresh token available in db or not
    
        if(incomingRefreshToken !== user?.refreshToken){
            throw new ApiError(401,"Refresh token has expired or used.")
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
    throw new ApiError(401,error?.message || "Invalid refresh token")
}

})

const changePassword = asyncHandler(async(req,res,next)=>{
    const { oldPassword, newPassword } = req.body;

    // const { oldPassword, newPassword, confirmPassword } = req.body;
    // if(!(confirmPassword === newPassword)){
    //     throw new ApiError(400,"new and confirm password is not matching.")
    // }

    const user = await User.findById(req.user?._id);
    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

    if(!isPasswordCorrect){
        throw new ApiError(400,"Invalid old Password")
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
        throw new ApiError(400, "Profile Image file is missing.");
    }

    const oldprofileImagePath = req.user?.profileImage;  // this "req.user?.avatar" will be old image path.
    await deleteOldImage(oldprofileImagePath)            //deleteOldImage() := delete the old profile image file from cloudinary server.

    // upload the profile image
    const profileImage = await uploadOnCloudinary(profileImageLocalPath);

    if(!profileImage.url){
        throw new ApiError(400, "Error found while uploading profileImage file");
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
    registerUser, 
    loginUser,
    logoutUser,
    refreshAccessToken,
    changePassword,
    updateUserProfileImage
}