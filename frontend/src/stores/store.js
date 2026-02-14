import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth.js'
import expenseReducer from './expense.js'
const store = configureStore({
    reducer: {
        authentication: authReducer,
        expense: expenseReducer
    }
})

export default store