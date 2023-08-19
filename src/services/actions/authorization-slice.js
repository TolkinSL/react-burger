import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {registerApi, loginApi, logoutApi, updateUserApi, getUserApi, refreshTokenApi} from "../../utils/api";
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
        const res = await registerApi(user);
        setCookie("accessToken", res.accessToken.split("Bearer ")[1]);
        setCookie("refreshToken", res.refreshToken);
        // console.log(res);
        return res.user;
    }
);

export const loginRequest = createAsyncThunk(
    "login/fetch",
    async (user) => {
        const res = await loginApi(user);
        setCookie("accessToken", res.accessToken.split("Bearer ")[1]);
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
    async (user) => {
        const res = await updateUserApi(user);
        // console.log(res);
        return res;
    }
);

export const getUserData = createAsyncThunk(
    "getUserData/fetch", async () => {
        try {
            const res = await getUserApi();
            return res.user;
        } catch (err) {
            return expiredToken(err).then(getUserData());
        }
});

const expiredToken = (err) => {
    // console.log('Error Token expiredToken-----');
    // console.log(err);
    if (err === "Ошибка: 403") {
        refreshTokenApi(getCookie("refreshToken"))
            .then((res) => {
                // console.log(res);
                setCookie("accessToken", res.accessToken.split("Bearer ")[1]);
                setCookie("refreshToken", res.refreshToken);
                return res.user
            })
            .catch((err) => {
                setCookie("accessToken", null);
                setCookie("refreshToken", null);
                return Promise.reject(err)
            });
    }
    return Promise.reject(err)
}

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
            .addCase(getUserData.pending, (state) => {
                state.isLoad = true;
            })
            .addCase(getUserData.fulfilled, (state, action) => {
                return {
                    isLoad: false,
                    isLogin: true,
                    success: true,
                    userData: action.payload,
                    error: null,
                };
            })
            .addCase(getUserData.rejected, (state, action) => {
                state.error = true;
            })
    },
});

export default authorizationSlice.reducer;