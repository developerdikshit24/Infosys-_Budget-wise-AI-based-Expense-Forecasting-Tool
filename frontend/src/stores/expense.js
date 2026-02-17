import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import { extractErrorMessage } from '../constant.js'
import { axiosInstance } from "../connection/axios.js";


export const getExpenseCatgoryThunk = createAsyncThunk('expenses/GetExpenseCategory', async (data, { dispatch, rejectWithValue }) => {
    try {
        const res = await axiosInstance.get('/expense/get-categories')
        return res.data.data
    } catch (error) {
        toast.error(extractErrorMessage(error.response.data || "Internal Server Error!"))
        return rejectWithValue(error.response.data || "Internal Server Error !")
    }

})

export const addExpenseThunk = createAsyncThunk('expense/addExpense', async (data, { dispatch, rejectWithValue }) => {
    try {
        const res = await axiosInstance.post('/expense/add-expense', data)
        dispatch(getRecentExpenseThunk())
        dispatch(getDashboardDataThunk())
        toast.success(res.data.message);
        return res.data.data
    } catch (error) {

        toast.error(extractErrorMessage(error.response.data || "Internal Server Error!"))
        return rejectWithValue(error.response.data || "Internal Server Error !")
    }
})

export const getRecentExpenseThunk = createAsyncThunk('expense/getRecentExpense', async (data, { dispatch, rejectWithValue }) => {
    try {
        const res = await axiosInstance.post('/expense/get-recentExpense', data);
        return res.data.data
    } catch (error) {

        toast.error(extractErrorMessage(error.response.data || "Internal Server Error!"))
        return rejectWithValue(error.response.data || "Internal Server Error !")
    }
})

export const getDashboardDataThunk = createAsyncThunk('expense/getDashboardData', async (_, {dispatch, rejectWithValue}) => {
    try {
        const res = await axiosInstance.get('/expense/get-dashData')
       
        return res.data.data
        
    } catch (error) {
        toast.error(extractErrorMessage(error.response.data || "Internal Server Error!"))
        return rejectWithValue(error.response.data || "Internal Server Error !")
        
    }
})

export const getCategoryTotalExpenseThunk = createAsyncThunk('expense/get-categoryExpense', async (_,{dispatch, rejectWithValue}) => {
    try {
        const res = await axiosInstance.get('/expense/get-categoryExpense');
        return res.data.data
        
    } catch (error) {
        toast.error(extractErrorMessage(error.response.data || "Internal Server Error!"))
        return rejectWithValue(error.response.data || "Internal Server Error !")
    }
})


const InitialStage = {
    isFetching: false,
    expenseCatgories: [],
    recentExenses: [],
    isFetching: false,
    dashboardData: null,
    categoryExpenseTotal:null

}

const expenseSlice = createSlice({
    name: "Expense",
    initialState: InitialStage,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getExpenseCatgoryThunk.pending, (state) => {
                state.isFetching = true
            })
            .addCase(getExpenseCatgoryThunk.fulfilled, (state, action) => {
                state.expenseCatgories = action.payload
                state.isFetching = false
            })
            .addCase(getExpenseCatgoryThunk.rejected, (state) => {
                state.isFetching = false
            })
            .addCase(getRecentExpenseThunk.pending, (state) => {
                state.isFetching = true
            })
            .addCase(getRecentExpenseThunk.fulfilled, (state, action) => {
                state.recentExenses = action.payload
                state.isFetching = false
            })
            .addCase(getRecentExpenseThunk.rejected, (state) => {
                state.isFetching = false
            })
            .addCase(getDashboardDataThunk.pending, (state) => {
                state.isFetching = true;
            })
            .addCase(getDashboardDataThunk.fulfilled, (state, action) => {
                state.dashboardData = action.payload
                state.isFetching = false
            })
            .addCase(getDashboardDataThunk.rejected, (state) => {
                state.isFetching = false
            })
            .addCase(getCategoryTotalExpenseThunk.pending, (state) => {
                state.isFetching = true
            })
            .addCase(getCategoryTotalExpenseThunk.fulfilled, (state, action) => {
                state.categoryExpenseTotal = action.payload
                state.isFetching = false
            })
            .addCase(getCategoryTotalExpenseThunk.rejected, (state) => {
                state.isFetching = false
            })

    }
})



export const { } = expenseSlice.actions
export default expenseSlice.reducer