import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {registerApi, loginApi, logoutApi, updateUserApi, getUserApi, refreshTokenApi} from "../../utils/api";
import {setCookie, getCookie, deleteCookie} from "../../utils/cookie";
import {TUserData} from "../../utils/types";

const initialState = {
    userData: null,
    isLoad: false,
    isLogin: false,
    error: false,
    success: false,
};

export const registerRequest = createAsyncThunk(
    "register/fetch",
    async (user: TUserData) => {
        const res = await registerApi(user);
        setCookie("accessToken", res.accessToken.split("Bearer ")[1]);
        setCookie("refreshToken", res.refreshToken);
        // console.log(res);
        return res.user;
    }
);

export const loginRequest = createAsyncThunk(
    "login/fetch",
    async (user: TUserData) => {
        const res = await loginApi(user);
        setCookie("accessToken", res.accessToken);
        setCookie("refreshToken", res.refreshToken);
        // console.log(res);
        return res.user;
    }
);

export const logoutRequest = createAsyncThunk(
    "logout/fetch",
    async () => {
        const res = await logoutApi(getCookie("refreshToken"));
        deleteCookie("accessToken");
        deleteCookie("refreshToken");
        // console.log(res);
        return res;
    });

export const updateUserRequest = createAsyncThunk(
    'userUpdate/fetch',
    async (user: TUserData) => {
        const res = await updateUserApi(user);
        return res;
    }
);

export const getUserData = createAsyncThunk(
    "getUserData/fetch", async () => {
        const res = await getUserApi();
        return res.user;
});

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
                state.error = true;
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
                    error: false,
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
            .addCase(getUserData.pending, (state) => {
                state.isLoad = true;
            })
            .addCase(getUserData.fulfilled, (state, action) => {
                return {
                    isLoad: false,
                    isLogin: true,
                    success: true,
                    userData: action.payload,
                    error: false,
                };
            })
            .addCase(getUserData.rejected, (state, action) => {
                state.error = true;
            })
    },
});

export default authorizationSlice.reducer;