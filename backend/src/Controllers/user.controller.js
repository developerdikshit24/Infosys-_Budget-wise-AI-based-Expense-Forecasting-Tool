import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import bcrypt from 'bcryptjs';
import { validationResult } from 'express-validator';
import db from '../config/db.js';
import jwt from 'jsonwebtoken';


const getCurrentUser = asyncHandler(async (req, res) => {
    return res.status(200)
        .json(new ApiResponse(200, req.user, "Current user fetch sucessfully"))
}
)

const registerUser = asyncHandler(async (req, res) => {
    const error = validationResult(req)

    if (!error.isEmpty()) {
        throw new ApiError(400, error.array())
    }


    const { name, email, password } = req.body;

    try {
        const [rows] = await db.query(
            "SELECT id FROM users WHERE email = ?",
            [email]
        );

        if (rows.length > 0) {
            throw new ApiError(409, "User already exists")
    
        }

        const encrption = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, encrption);

        const [result] = await db.query(
            "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
            [name, email, hashedPassword]
        );

        return res.status(201).json(
            new ApiResponse(201, result, "User registered successfully")
        );

    } catch (error) {
        throw new ApiError(500, error)
    }

})


const loginUser = asyncHandler(async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        throw new ApiError(400, error.array());
    }
    const { email, password } = req.body;

    const [row] = await db.query(
        'Select * FROM users WHERE email = ?',
        [email]
    )

    if (row.length === 0) {
        throw new ApiError(404, "User doesn't exist")
    }
    const user = row[0];
    const validatePassword = await bcrypt.compare(password, user.password)

    if (!validatePassword) {
        throw new ApiError(401, "Invalid Credentials");
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
    res.status(201)
        .json(new ApiResponse(200,
            {
                id: user.id,
                name: user.name,
                email: user.email,
                monthly_limit: user.monthly_limit
            }, 'Login successful!'))

}
)


const logoutUser = asyncHandler(async (req, res) => {

    if (!req.user) {
         throw new ApiError(401, "Unauthorized Access")
    }

    const option = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000
    }

    return res
        .status(200)
        .clearCookie('token', option)
        .json(new ApiResponse(200, {}, "Loggout Successfully!"))
})

const updateMonthlyLimit = asyncHandler(async (req, res) => {

    try {
        const Error = validationResult(req);
        if (!Error.isEmpty()) {
            throw new ApiError(404, Error.array())
        }

        const userId = req.user.id;

        const { monthly_limit_amount } = req.body;

        const [result] = await db.query(
            "UPDATE users SET monthly_limit = ? WHERE id = ?",
            [monthly_limit_amount, userId]
        );

        if (result.length === 0) throw new ApiError(500, "Internal Server Error");
        const [user] = await db.query(
            `Select id, name, email, monthly_limit FROM users WHERE id = ?`, [userId]
        )

        return res.status(201).json(new ApiResponse(200, user, "Limit set successfully"))
    } catch (error) {
        throw  new ApiError(500, error)
    }

})

export {
    getCurrentUser,
    registerUser,
    loginUser,
    logoutUser,
    updateMonthlyLimit,
}