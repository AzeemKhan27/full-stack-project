import mongoose from 'mongoose';
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({


    otp: { type: String, default: null }, // OTP as a string
    otpExpiry: { type: Date, default: null }, 

    username : {
        type : String,
        // required : true,
        unique : true,
        lowercase : true,
        trim : true,
        index : true   // index will optimise for searching.
    },

    email : {
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true
       },

       fullName : {
        type : String,
        // required : true,
        trim : true,
        index : true
       },

       profileImage:{
        type : String
       },

       password : {
        type : String,
        // required : true
       },

        refreshToken : {
            type : String
        }
    },
    {
        timestamps : true

    }
)

userSchema.pre("save", async function(next){    //.pre is hook function
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password,10);
    next();
});

//adding method named "isPasswordCorrect" for comparing password in bcrypt package.
userSchema.methods.isPasswordCorrect = async function(password){
   return await bcrypt.compare(password,this.password);
}

userSchema.methods.generateAccessToken = async function(){   // async await is not required for this.
    return await jwt.sign(
        {
            _id: this._id,
            email : this.email,
            username : this.username,
            fullName : this.fullName   //"fullName" is name of key and "this.fullName" coming from DB
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn : process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

//refresh token
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn : process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model('User',userSchema);