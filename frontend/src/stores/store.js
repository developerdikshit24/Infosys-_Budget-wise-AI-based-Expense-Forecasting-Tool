import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth.js'

const store = configureStore({
    reducer: {
        authentication:authReducer
    }
})

export default store