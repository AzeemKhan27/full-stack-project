import { Router } from "express";
import { verifyOtp, loginAndSendOtp } from "../controllers/user.controller.js";

const router = Router();

router.post('/verify-otp', verifyOtp); // Verify OTP
router.post('/login-direct-and-register', loginAndSendOtp); // Login and send OTP

export default router;