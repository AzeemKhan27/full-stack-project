import express from 'express';
import cors from 'cors';    
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

const app = express();

//-------middlewares-------
app.use(cors({                        
    origin : process.env.CORS_ORIGIN,
    credentials : true
}));

app.use(express.json({limit : "16kb"}));                         // we are allowing JSON data from body/form until 16KB
app.use(express.urlencoded({extended : true, limit: "16kb"}));   //this middleware allows data from URL.
app.use(express.static("public"))                                //this middleware allows to store files/images, and giving access to all.
app.use(cookieParser());     
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));     

//Routes Import
import emailRoute from "./routes/mail.routes.js";
import userRoutes from "./routes/user.routes.js";

//Routes Declaration
app.use("/api/v1/mails",emailRoute);
app.use("/api/v1/users",userRoutes);

//debug code 
app.use((req, res, next) => {
    console.log("Incoming Request: ", req.method, req.url);
    console.log("Headers: ", req.headers);
    console.log("Body: ", req.body);
    next();
});


export { app }