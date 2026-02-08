import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import bcrypt from 'bcryptjs';
import { validationResult } from 'express-validator';
import db from '../config/db.js';
import jwt from 'jsonwebtoken';

const registerUser = asyncHandler(async (req, res) => {
    const error = validationResult(req)

    if (!error.isEmpty()) {
        return res.status(400).json(new ApiError(400, error.array()))
    }


    const { fullName, email, password } = req.body;

    try {
        const [rows] = await db.query(
            "SELECT id FROM users WHERE email = ?",
            [email]
        );

        if (rows.length > 0) {
            return res.status(409).json(
                new ApiError(409, "User already exists")
            );
        }

        const encrption = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, encrption);

        const [result] = await db.query(
            "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
            [fullName, email, hashedPassword]
        );

        return res.status(201).json(
            new ApiResponse(201, result, "User registered successfully")
        );

    } catch (error) {
        return res.status(500).json(
            new ApiError(500, "Server error")
        );
    }

})



const loginUser = asyncHandler(async (req, res) => {

    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json(new ApiError(400, error.array()));
        }
        const { email, password } = req.body;
       
        const [row] = await db.query(
            'Select * FROM users WHERE email = ?',
            [email]
        )
    
        if (row.length === 0) {
            return res.status().json(new ApiError(404, "User doesn't exist"))
        }
        const user = row[0];
        const validatePassword = await bcrypt.compare(password, user.password)
    
        if (!validatePassword) {
            return res.status(401).json(new ApiError(401, "Invalid Credentials"));
        }
    
        const token = jwt.sign({
            id: user.id,
            email: user.email
        },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        )
    
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000
        });
        res.status(201).json(new ApiResponse(200, { id: user.id, name: user.name, email: user.email }, 'Login successful!'))
    
    } catch (error) {
        return res.status(500).json(new ApiError(500, error))
    }
}
)

export {
    registerUser,
    loginUser
}