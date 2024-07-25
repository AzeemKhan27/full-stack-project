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

// Verify OTP
const verifyOtp = asyncHandler(async (req, res) => {
    const { email, otp } = req.body;
  
    if (!email || !otp) {
      return res.status(400).json(new ApiError(400, {}, 'Email and OTP are required.'));
    }
  
    const user = await User.findOne({ email });
  
    if (!user) {
      return res.status(401).json(new ApiError(401, {}, 'User not found.'));
    }
  
    if (user.otp !== otp || user.otpExpiry < Date.now()) {
      return res.status(401).json(new ApiError(401, {}, 'Invalid or expired OTP.'));
    }
  
    user.otp = null;
    user.otpExpiry = null;
    await user.save();
  
    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);
  
    const loggedInUser = await User.findById(user._id).select('-password -refreshToken -otp -otpExpiry');
  
    const options = {
      httpOnly: true,
      secure: true,
    };
  
    return res
      .status(200)
      .cookie('accessToken', accessToken, options)
      .cookie('refreshToken', refreshToken, options)
      .json(new ApiResponse(200, { user: loggedInUser, accessToken, refreshToken }, 'User Logged In Successfully'));
  });
  
  // Login and send OTP
  const loginAndSendOtp = asyncHandler(async (req, res) => {
    const { email } = req.body;
  
    if (!email) {
      return res.status(400).json(new ApiError(400, {}, 'Email is required.'));
    }
  
    let user = await User.findOne({ email });
  
    if (!user) {
      user = new User({ email });
      await user.save();
    }
  
    const otp = generateOtp();
    user.otp = otp;
    user.otpExpiry = Date.now() + 10 * 60 * 1000; // OTP valid for 10 minutes
    await user.save();
  
    await sendOtpEmail(email, otp);
  
    return res.status(200).json(new ApiResponse(200, { email }, 'OTP sent successfully'));
  });
  
  export {
    verifyOtp,
    loginAndSendOtp,
  };