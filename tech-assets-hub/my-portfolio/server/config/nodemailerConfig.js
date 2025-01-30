
// server/config/nodemailerConfig.js

// config/nodemailerConfig.js
// import { google } from 'googleapis';
// import dotenv from 'dotenv';

// dotenv.config();

// const OAuth2 = google.auth.OAuth2;

// const oauth2Client = new OAuth2(
//   process.env.GOOGLE_CLIENT_ID,
//   process.env.GOOGLE_CLIENT_SECRET,
//   'https://developers.google.com/oauthplayground'
// );

// oauth2Client.setCredentials({
//   refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
// });

// const accessToken = process.env.GOOGLE_ACCESS_TOKEN || oauth2Client.getAccessToken();
// console.log(" getAccessToken access token: " + oauth2Client.getAccessToken())
// console.log(" access token: " + process.env.GOOGLE_ACCESS_TOKEN)

// const nodemailerConfig = {
//   service: 'Gmail',
//   auth: {
//     type: 'OAuth2',
//     user: process.env.EMAIL_USER,
//     clientId: process.env.GOOGLE_CLIENT_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
//     accessToken: process.env.GOOGLE_ACCESS_TOKEN,
//   },
//   adminEmail: process.env.EMAIL_USER, // Your admin/portal email
// };

// export default nodemailerConfig;


const nodemailerConfig = {
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  adminEmail: process.env.EMAIL_USER, // Your admin/portal email
};

export default nodemailerConfig;
