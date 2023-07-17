import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {registerApi, loginApi} from "../../utils/api";
import {setCookie} from "../../utils/cookie";

const initialState = {
    userData: null,
    isLoad: false,
    isLogin: false,
    error: null,
    success: false,
};

export const registerRequest = createAsyncThunk(
    "register/fetch",
    async (user) => {
        const response = await registerApi(user);
        setCookie("accessToken", response.accessToken.split("Bearer ")[1]);
        setCookie("refreshToken", response.refreshToken);
        console.log(response);
        return response.user;
    }
);

export const loginRequest = createAsyncThunk(
    "login/fetch",
    async (user) => {
    const response = await loginApi(user);
    setCookie("accessToken", response.accessToken.split("Bearer ")[1]);
    setCookie("refreshToken", response.refreshToken);
    console.log(response);
    return response.user;
});

const authorizationSlice = createSlice({
    name: "authorization",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registerRequest.pending, (state) => {
                return { ...state, isLoad: true };
            })
            .addCase(registerRequest.fulfilled, (state, action) => {
                state.userData = action.payload;
                state.isLogin = true;
            })
            .addCase(registerRequest.rejected, (state, action) => {
                state.error = action.error.message;
            })
            .addCase(loginRequest.pending, (state) => {
                return { ...state, isLoad: true };
            })
            .addCase(loginRequest.fulfilled, (state, action) => {
                return {
                    isLoad: false,
                    isLogin: true,
                    success: true,
                    userData: action.payload,
                    error: null,
                };
            })
            .addCase(loginRequest.rejected, (state, action) => {
                return {...state, error: true}
            })
    },
});

export default authorizationSlice.reducer;