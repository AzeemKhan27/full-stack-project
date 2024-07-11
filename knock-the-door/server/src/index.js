import dotenv from 'dotenv';
import { app } from "./app.js";
dotenv.config = ({path : './.env'});

import connectDB from "./db/index.js";
connectDB()
.then(() => {
  app.listen(process.env.PORT || 5000, () => {
     console.log(`Server running at port : ${process.env.PORT}`);
  })
})
.catch((err) => {
  console.log("mongodb connection failed !!!", err.message);
})