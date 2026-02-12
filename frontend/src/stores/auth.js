import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import { extractErrorMessage } from '../constant.js'
import { axiosInstance } from "../connection/axios.js";


export const registerUserThunk = createAsyncThunk('auth/registerUser', async (data, { dispatch, rejectedWithValue }) => {
    try {
        const res = await axiosInstance.post('/users/register', data)
        toast.success("Welcome", res.data.name)
        return res.data
    } catch (error) {
        toast.error(extractErrorMessage(error.response.data || "Internal Server Error!"))
        return rejectedWithValue(error.response.data || "Internal Server Error !")
    }
})


const InitialStage = {
    loggedUser: null,
    isAuthenticating: false

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
    }
})

export const{ addCase } =  authSlice.actions

export default authSlice.reducer