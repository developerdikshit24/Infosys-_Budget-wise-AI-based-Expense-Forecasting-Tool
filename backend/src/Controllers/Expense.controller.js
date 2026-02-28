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
            throw new ApiError(404, "No Categories Available")
        }
        return res.status(200).json(new ApiResponse(200, categories, "Categories fetch successfully"))
    } catch (error) {
        throw new ApiError(500, error)
    }


})

const addExpense = asyncHandler(asyncHandler(async (req, res) => {

    try {
        const Error = validationResult(req);
        if (!Error.isEmpty()) {
            throw new ApiError(404, Error.array())
        }

        const { user_id, category_id, amount, description, expense_date } = req.body;

        const [result] = await db.query(
            'INSERT INTO expenses (user_id, category_id, amount, description, expense_date) VALUES (?, ?, ?, ?, ?) ',
            [user_id, category_id, amount, description, expense_date]
        )

        return res.status(201).json(new ApiResponse(201, result, "Expense Add Successfully"))
    } catch (error) {
        throw new ApiError(500, error)

    }

}))


const getRecentExpense = asyncHandler(async (req, res) => {
    try {
        const Error = validationResult(req);
        if (!Error.isEmpty()) {
            throw new ApiError(404, Error.array())
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
                WHERE e.user_id = ?
                ORDER BY e.expense_date DESC
                LIMIT 4`,
            [userId]
        );
        if (result.length == 0) {
            throw new ApiError(404, "No Recent Transaction")
        }


        return res.status(201).json(new ApiResponse(201, result, "Recent transaction fetch successfully"));

    } catch (error) {
        throw new ApiError(500, error)
    }

})

const getDashboardData = asyncHandler(async (req, res) => {
    try {
        const error = validationResult(req)

        if (!error.isEmpty()) {
            throw new ApiError(400, error.array())
        }

        const userId = req.user.id;
        if (!userId) throw new ApiError(401, "Unauthorized Access")

        const [total_spend] = await db.query(
            `SELECT IFNULL(SUM(amount), 0) as total_spend 
             FROM expenses WHERE user_id = ?
             `, [userId]
        )
        if (total_spend.length == 0) throw new ApiError(404, "No Total Spendind Data Found!")
        const [todays_spend] = await db.query(
            `SELECT IFNULL(SUM(amount), 0) as todays_spend
                 FROM expenses WHERE user_id = ?
                 AND DATE(expense_date) = CURDATE();`,
            [userId]
        )
        if (todays_spend.length == 0) throw new ApiError(404, "No Today Spendind Data Found!")

        const [monthly_spending] = await db.query(
            `SELECT IFNULL(SUM(amount), 0) as monthly_spend
                 FROM expenses WHERE user_id = ?
                 AND MONTH(expense_date) = MONTH(CURDATE())
                 AND YEAR(expense_date) = YEAR(CURDATE());
                 `
            , [userId]
        )
        if (monthly_spending.length == 0) throw new ApiError(404, "No Monthly Spendind Data Found!")

        const [spending_data] = await db.query(
            `SELECT
             DATE_FORMAT(expense_date, '%b') AS month,
             IFNULL(SUM(amount),0) AS value
             FROM expenses
             WHERE user_id = ?
             GROUP BY YEAR(expense_date), MONTH(expense_date)
             ORDER BY YEAR(expense_date), MONTH(expense_date);`, [userId]
        )

        const result = {
            todays_spend: todays_spend[0].todays_spend,
            total_spend: total_spend[0].total_spend,
            monthly_spend: monthly_spending[0].monthly_spend,
            spending_data: spending_data
        }

        return res.status(201).json(new ApiResponse(201, result, "Dashboard data fetch successfully"))

    } catch (error) {
        throw new ApiError(500, error)
    }
})

const totalCatgeoryExpense = asyncHandler(async (req, res) => {
    try {
        const error = validationResult(req)

        if (!error.isEmpty()) {
            throw new ApiError(400, error.array())
        }
        const userId = req.user.id
        const [category_expense] = await db.query(

            `SELECT
                c.category_name AS category,
                c.id AS category_id,
                c.user_id AS user_id,
                IFNULL(SUM(e.amount), 0) AS total
                FROM categories c
                LEFT JOIN expenses e
                ON e.category_id = c.id
                AND e.user_id = ?
                WHERE c.user_id = 0
                OR c.user_id = ?
                GROUP BY c.id, c.category_name
                ORDER BY total DESC;`,
            [userId, userId]
        )
        if (!category_expense.length) throw new ApiError(404, "No value found")
        return res.status(201).json(new ApiResponse(201, category_expense, "Data fetch successfully"))

    } catch (error) {
        throw new ApiError(500, error)
    }
})

const addExpenseCategory = asyncHandler(async (req, res) => {
    try {
        const Error = validationResult(req);
        if (!Error.isEmpty()) {
            throw new ApiError(400, Error.array())
        }

        const { category_name } = req.body;
        const [result] = await db.query(
            `INSERT INTO categories (category_name, user_id) VALUES (?, ?)`,
            [category_name, req.user.id]
        )
        return res.status(200).json(new ApiResponse(200, result, "Category Add Successfully"))
    } catch (error) {
        throw new ApiError(500, error)
    }

})


const deletUserCategory = asyncHandler(async (req, res) => {
   try {
     const Error = validationResult(req)
     
     if (!Error.isEmpty()) {
         throw new ApiError(400, Error.array())
     }
 
     const { category_id } = req.body
 
     const [result] = await db.query(
         `Delete from categories
             where user_id = ?
             AND
             id = ?
             `
         , [req.user.id, category_id]
     );
     
     if (!result.length) throw new ApiError(500, "Internal server error");
     return res.status(200).json(new ApiResponse(200, result, "Delete Category Successfully"));
   } catch (error) {
       throw new ApiError(500, error)
   }

})

export {
    getCategories,
    addExpense,
    getRecentExpense,
    getDashboardData,
    totalCatgeoryExpense,
    addExpenseCategory,
    deletUserCategory
}