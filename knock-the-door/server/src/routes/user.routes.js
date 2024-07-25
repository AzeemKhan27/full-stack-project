import { Router } from "express";
import { registerAndSendOtp,verifyOtpAndLogin,registerUser, loginUser, logoutUser, refreshAccessToken, updateUserProfileImage, changePassword } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(
    upload.fields([
        { name: "profileImage", maxCount: 1 }
    ]),
    registerUser
    )

router.route("/login").post(loginUser);

router.route("/direct-register-sendotp").post(registerAndSendOtp,verifyJWT)
router.route("/login-direct").post(verifyOtpAndLogin,verifyJWT);

//secured routes    
router.route("/logout").post(verifyJWT, logoutUser)  // "verifyJWT" this middleware verify token by Id.
router.route("/refresh-token").post(refreshAccessToken) // here we are verifying the refresh token
router.route("/change-password").post(verifyJWT,changePassword)
router.route("/update-profile-image").patch(verifyJWT,upload.single("profileImage"),updateUserProfileImage);

export default router;