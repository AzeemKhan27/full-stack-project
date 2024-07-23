import crypto from 'crypto';
import nodemailer from 'nodemailer';

// Generate OTP
export const generateOtp = () => {
    // return crypto.randomBytes(3).toString('hex'); // Generates a 6-character OTP
    
    return Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit numeric OTP
};

// Send OTP Email
export const sendOtpEmail = async (email, otp) => {
    const transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port : process.env.MAIL_PORT,
        secure : process.env.MAIL_PORT == 465,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS
        }
    });

    const mailOptions = {
        from: process.env.SEND_MAIL_TO_USER_BY_ADMIN,
        to: email,
        subject: 'Your OTP Code By Knock-The-Door',
        text: `Your OTP code is ${otp}`
    };

    await transporter.sendMail(mailOptions);
};