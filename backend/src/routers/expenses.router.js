import { Router } from "express";
import { addExpense, getCategories, getRecentExpense,  } from "../Controllers/Expense.controller.js";
import { verifyJwt } from "../middleware/auth.middleware.js";


const router = Router()

router.route('/get-categories').get(getCategories)
router.route('/add-expense').post(verifyJwt, addExpense)
router.route('/get-recentExpense').post(verifyJwt, getRecentExpense)

export default router