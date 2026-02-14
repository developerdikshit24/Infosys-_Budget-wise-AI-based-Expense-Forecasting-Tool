import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { validationResult } from 'express-validator';
import db from '../config/db.js';


const getCategories = asyncHandler(async (req, res) => {
    try {
        const [categories] = await db.query(
            'Select * FROM categories'
        )
        if (categories.length == 0) {
            return res.status(404).json(new ApiError(404, "No Categories Available"))
        }
        return res.status(200).json(new ApiResponse(200, categories, "Categories fetch successfully"))
    } catch (error) {
        return res.status(500).json(new ApiError(500, error))
    }


})

const addExpense = asyncHandler(asyncHandler(async (req, res) => {

    try {
        const Error = validationResult(req);
        if (!Error.isEmpty()) {
            return res.status(404).json(new ApiError(404, Error.array()))
        }

        const { user_id, category_id, amount, description, expense_date } = req.body;

        const [result] = await db.query(
            'INSERT INTO expenses (user_id, category_id, amount, description, expense_date) VALUES (?, ?, ?, ?, ?) ',
            [user_id, category_id, amount, description, expense_date]
        )

        return res.status(201).json(new ApiResponse(201, result, "Expense Add Successfully"))
    } catch (error) {
        return res.status(500).json(new ApiError(500, error))

    }

}))


const getRecentExpense = asyncHandler(async (req, res) => {
    try {
        const Error = validationResult(req);
        if (!Error.isEmpty()) {
            return res.status(404).json(new ApiError(404, Error.array()))
        }

        const { userId } = req.body;
        const [result] = await db.query(

            `SELECT 
             c.category_name,
             e.amount,
             e.description,
             e.expense_date
             FROM expenses e
             JOIN categories c 
             ON e.category_id = c.id
             WHERE e.user_id = ?`,

            [userId]
        )
        if (result.length == 0) {
            return res.status(404).json(new ApiError(404, "No Recent Transaction"))
        }


        return res.status(201).json(new ApiResponse(201, result, "Recent transaction fetch successfully"));
    
    } catch (error) {
        return res.status(500).json(new ApiError(500, error))
    }

})


export {
    getCategories,
    addExpense,
    getRecentExpense
}