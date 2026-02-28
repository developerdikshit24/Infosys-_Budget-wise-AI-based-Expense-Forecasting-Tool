import db from "../config/db.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"

export const verifyJwt = asyncHandler(async (req, res, next) => {
    try {
        const token = req.cookies?.token || req.header("Authorization")?.replace("Bearer", "")

        if (!token) {
            throw new ApiError(400, "Unauthorized Request")
        }
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET) 
        const [user] = await db.query(
            "Select id, email, name, monthly_limit FROM users WHERE id = ?",
            [decodedToken?.id]
        )
        
        if (!user.length) {
            throw new ApiError(401, "Login Required!")
        }
        req.user = user[0];
        
        next();
            
    } catch (error) {
        throw new ApiError(401, "Login Required!")

    }
})

