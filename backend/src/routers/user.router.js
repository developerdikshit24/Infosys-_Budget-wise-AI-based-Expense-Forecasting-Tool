import { registerUser, loginUser, logoutUser, getCurrentUser, updateMonthlyLimit } from '../Controllers/user.controller.js';
import { Router } from 'express';
import { verifyJwt } from '../middleware/auth.middleware.js'
const router = Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser)
router.route('/logout').get(verifyJwt, logoutUser)
router.route('/get-user').get(verifyJwt, getCurrentUser)
router.route('/set-monthlyLimit').post(verifyJwt, updateMonthlyLimit)

export default router