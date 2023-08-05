import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {registerApi, loginApi, logoutApi, updateUserApi} from "../../utils/api";
import {setCookie, getCookie, deleteCookie} from "../../utils/cookie";

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
    }
);

export const logoutRequest = createAsyncThunk(
    "logout/fetch",
    async () => {
        const response = await logoutApi(getCookie("refreshToken"));
        deleteCookie("accessToken");
        deleteCookie("refreshToken");
        console.log(response);
        return response;
    });

export const updateUserRequest = createAsyncThunk(
    'user/upddata',
    async (user) => {
        const response = await updateUserApi(user);
        console.log(response);
        return response;
    }
);

const authorizationSlice = createSlice({
    name: "authorization",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registerRequest.pending, (state) => {
                state.isLoad = true;
            })
            .addCase(registerRequest.fulfilled, (state, action) => {
                state.userData = action.payload;
                state.isLogin = true;
            })
            .addCase(registerRequest.rejected, (state, action) => {
                state.error = action.error.message;
            })
            .addCase(loginRequest.pending, (state) => {
                state.isLoad = true;
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
                state.error = true;
            })
            .addCase(logoutRequest.pending, (state) => {
                return {...state};
            })
            .addCase(logoutRequest.fulfilled, (state) => {
                return initialState;
            })
            .addCase(logoutRequest.rejected, (state, action) => {
                state.error = true;
            })
            .addCase(updateUserRequest.pending, (state) => {
                return {...state};
            })
            .addCase(updateUserRequest.fulfilled, (state, action) => {
                state.userData = action.payload.user;
                state.isLogin = true;
            })
            .addCase(updateUserRequest.rejected, (state, action) => {
                state.error = true;
            })
    },
});

export default authorizationSlice.reducer;