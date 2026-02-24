import { Router } from "express";
import { addExpense, addExpenseCategory, deletUserCategory, getCategories, getDashboardData, getRecentExpense, getUserCategory, totalCatgeoryExpense, } from "../Controllers/Expense.controller.js";
import { verifyJwt } from "../middleware/auth.middleware.js";


const router = Router()

router.route('/get-categories').get(getCategories)
router.route('/add-expense').post(verifyJwt, addExpense)
router.route('/get-recentExpense').post(verifyJwt, getRecentExpense)
router.route('/get-dashData').get(verifyJwt, getDashboardData)
router.route('/get-categoryExpense').get(verifyJwt, totalCatgeoryExpense)
router.route(`/add-userExpenseCategory`).post(verifyJwt, addExpenseCategory)
router.route('/get-userExpenseCategory').get(verifyJwt, getUserCategory)
router.route('/delete-userExpenseCatgory').delete(verifyJwt, deletUserCategory)

export default router