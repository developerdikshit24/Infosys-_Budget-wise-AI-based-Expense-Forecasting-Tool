import { Router } from "express";
import { addExpense, getCategories, getDashboardData, getRecentExpense, totalCatgeoryExpense, } from "../Controllers/Expense.controller.js";
import { verifyJwt } from "../middleware/auth.middleware.js";


const router = Router()

router.route('/get-categories').get(getCategories)
router.route('/add-expense').post(verifyJwt, addExpense)
router.route('/get-recentExpense').post(verifyJwt, getRecentExpense)
router.route('/get-dashData').get(verifyJwt, getDashboardData)
router.route('/get-categoryExpense').get(verifyJwt, totalCatgeoryExpense)

export default router