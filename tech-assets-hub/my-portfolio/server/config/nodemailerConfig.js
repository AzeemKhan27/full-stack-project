
// server/config/nodemailerConfig.js
const nodemailerConfig = {
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  adminEmail: process.env.EMAIL_USER, // Your admin/portal email
};

export default nodemailerConfig;
