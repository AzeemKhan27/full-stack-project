import dotenv from 'dotenv';
import { app } from "./app.js";
// dotenv.config = ({path : './.env'});
dotenv.config = ({path : '././.env'});
console.log("process.env.PORT ==>", process.env.PORT)

import connectDB from "./db/index.js";
connectDB()
.then(() => {
  app.listen(process.env.PORT || 8080, () => {
     console.log(`Server running at port : ${process.env.PORT}`);
  })
})
.catch((err) => {
  console.log("mongodb connection failed !!!", err.message);
})