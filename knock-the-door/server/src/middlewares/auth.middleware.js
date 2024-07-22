import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import JWT from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const verifyJWT = asyncHandler(async(req, res, next) => {
    try {
       
        const token = req.cookies.accessToken || req.header("Authorization")?.replace("Bearer ", "");

        if(!token){
           return res.status(401).json(new ApiError(401,token,"Unauthorized request || invalid token"))
        }
    
        const decodedToken = await JWT.verify(token,process.env.ACCESS_TOKEN_SECRET);
    
        const user = await User.findById(decodedToken?._id)
                               .select("-password -refreshToken");
        if(!user){
            return res.status(401).json( new ApiError(401,user,"Invalid Access Token") )
        } 
        
        req.user = user;
        next()
    } catch (error) {
        return res.status(500).json(new ApiError(500,error,"Invalid token || Expired Access Token."))
    }
})