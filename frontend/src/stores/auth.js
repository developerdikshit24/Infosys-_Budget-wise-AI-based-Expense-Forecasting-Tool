import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import { extractErrorMessage } from '../constant.js'
import { axiosInstance } from "../connection/axios.js";
import { getCategoryTotalExpenseThunk, getDashboardDataThunk, getExpenseCatgoryThunk } from "./expense.js";


export const getCurrentUserThunk = createAsyncThunk('auth/getCurrentUser', async (_, { dispatch, rejectWithValue }) => {
    try {
        const res = await axiosInstance.get('/users/get-user');
        dispatch(getDashboardDataThunk())
        dispatch(getCategoryTotalExpenseThunk())
        toast.success(res.data.message)
        return res.data.data
    } catch (error) {
        toast.error(extractErrorMessage(error.response.data || "Internal Server Error!"))
        return rejectWithValue(error.response.data || "Internal Server Error !")
    }
})

export const registerUserThunk = createAsyncThunk('auth/registerUser', async (data, { dispatch, rejectWithValue }) => {
    try {
        const res = await axiosInstance.post('/users/register', data)
        toast.success("Welcome ", res.data.name)
        return res.data
    } catch (error) {
        toast.error(extractErrorMessage(error.response.data || "Internal Server Error!"))
        return rejectWithValue(error.response.data || "Internal Server Error !")
    }
})

export const loginUserThunk = createAsyncThunk('auth/loginUser', async (data, { dispatch, rejectWithValue }) => {
    try {
        const res = await axiosInstance.post('/users/login', data);
        dispatch(getDashboardDataThunk())
        dispatch(getExpenseCatgoryThunk())
        dispatch(getCategoryTotalExpenseThunk())
        toast.success(`Welcome Back ${res.data.data.name}`) 
        return res.data.data
    } catch (error) {
        toast.error(extractErrorMessage(error.response.data || "Internal Server Error!"))
        return rejectWithValue(error.response.data || "Internal Server Error !")
    }
})

export const logoutUserThunk = createAsyncThunk('auth/logout', async (req, res) => {
    try {
        const res = await axiosInstance.get('/users/logout');
        return res
    } catch (error) {
        toast.error(extractErrorMessage(error.response.data || "Internal Server Error!"))
        return rejectWithValue(error.response.data || "Internal Server Error !")
    }
})

export const setMonthlyLimitThunk = createAsyncThunk('auth/setMonthlyLimit', async (data, { dispatch, rejectWithValue }) => {
    try {
        
        const res = await axiosInstance.post('/users/set-monthlyLimit', data)
        toast.success(res.data.message);
        return res.data.data

    } catch (error) {
        toast.error(extractErrorMessage(error.response.data || "Internal Server Error!"))
        return rejectWithValue(error.response.data || "Internal Server Error !")
    }
})



const InitialStage = {
    loggedUser: null,
    isAuthenticating: false,
   
}

const authSlice = createSlice({
    name: "Authentication",
    initialState: InitialStage,
    reducers: {
        addUser: (state) => {
            state.isAuthenticating = true
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCurrentUserThunk.pending, (state) => {
                state.isAuthenticating = true
            })
            .addCase(getCurrentUserThunk.fulfilled, (state, action) => {
                state.loggedUser = action.payload
                state.isAuthenticating = false
            })
            .addCase(getCurrentUserThunk.rejected, (state) => {
                state.isAuthenticating = false
            })
            .addCase(registerUserThunk.pending, (state) => {
                state.isAuthenticating = true
            })
            .addCase(registerUserThunk.fulfilled, (state, action) => {
                state.loggedUser = action.payload
                state.isAuthenticating = false
            })
            .addCase(registerUserThunk.rejected, (state) => {
                state.isAuthenticating = false
            })
            .addCase(loginUserThunk.pending, (state, action) => {
                state.isAuthenticating = true;
            })
            .addCase(loginUserThunk.fulfilled, (state, action) => {
                state.loggedUser = action.payload
                state.isAuthenticating = false;
            })
            .addCase(loginUserThunk.rejected, (state) => {
                state.isAuthenticating = false;
            })
            .addCase(logoutUserThunk.pending, (state) => {
                state.isAuthenticating = true
            })
            .addCase(logoutUserThunk.fulfilled, (state) => {
                state.loggedUser = null
                state.isAuthenticating = false
            })
            .addCase(logoutUserThunk.rejected, (state) => {
                state.isAuthenticating = false
            })
            .addCase(setMonthlyLimitThunk.pending, (state) => {
                state.isAuthenticating = true
            })
            .addCase(setMonthlyLimitThunk.fulfilled, (state, action) => {
                state.loggedUser = action.payload[0]
                state.isAuthenticating = false
            })
            .addCase(setMonthlyLimitThunk.rejected, (state) => {
                state.isAuthenticating = false
            })
            

    }
})

export const { addCase } = authSlice.actions

export default authSlice.reducer