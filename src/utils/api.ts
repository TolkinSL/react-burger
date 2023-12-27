import {getCookie, setCookie} from "./cookie";
import {TError, TFetchData} from "./types";

const BASE_URL = 'https://norma.nomoreparties.space/api';

export const getIngredientsApi = async () => {
    return await fetch(`${BASE_URL}/ingredients`)
        .then(checkResponse);
};

export const getCurrentOrderApi = async (number: string) => {
    return  await fetch(`${BASE_URL}/orders/${number}`)
        .then(checkResponse);
}

export const getOrderApi = (itemsId: string[]) => {
    return fetchWithRefresh('POST', `${BASE_URL}/orders`, {ingredients: itemsId});
};

export const registerApi = (user: TFetchData) => {
    return fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            name: user.name,
            email: user.email,
            password: user.password,
        }),
    })
        .then(checkResponse);
};

export const loginApi = (user: TFetchData) => {
    return fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            email: user.email,
            password: user.password,
        }),
    })
        .then(checkResponse);
};

export const restorePasswordApi = (user: TFetchData) => {
    return fetch(`${BASE_URL}/password-reset`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            email: user.email,
        }),
    })
        .then(checkResponse);
};

export const resetPasswordApi = (values: TFetchData) => {
    return fetch(`${BASE_URL}/password-reset/reset`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            password: values.password,
            token: values.token,
        }),
    })
        .then(checkResponse);
};

export const logoutApi = (token: string) => {
    return fetch(`${BASE_URL}/auth/logout`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            token: token,
        }),
    })
        .then(checkResponse);
};

export function updateUserApi(user: TFetchData) {
    return fetchWithRefresh('PATCH', `${BASE_URL}/auth/user`, {
        name: user.name,
        email: user.email,
        password: user.password
    });
}

export function getUserApi() {
    return fetchWithRefresh('GET', `${BASE_URL}/auth/user`);
}

//New Authorization
export const refreshTokenApi = () => {
    return fetch(`${BASE_URL}/auth/token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
            token: getCookie("refreshToken"),
        }),
    })
        .then(checkResponse);
};

export const fetchWithRefresh = async (method: string, URL: string, bodyJson?: TFetchData) => {
    const config = {
        method: method,
        headers: {
            'Content-Type': "application/json",
            authorization: getCookie("accessToken"),
        },
        body: JSON.stringify(bodyJson)
    }
    try {
        const res = await fetch(URL, config);
        return await checkResponse(res);
    } catch (err) {
        if (err instanceof Error && err.message === "jwt expired") {
            const refreshData = await refreshTokenApi();
            if (!refreshData.success) {
                return Promise.reject(refreshData);
            }
            setCookie("accessToken", refreshData.accessToken);
            setCookie("refreshToken", refreshData.refreshToken);
            config.headers.authorization = refreshData.accessToken;
            const res = await fetch(URL, config);
            return await checkResponse(res);
        } else {
            return Promise.reject(err);
        }
    }
};

const checkResponse = (res: Response) => {
    return res.ok ? res.json() : res.json().then((err: TError) => Promise.reject(err));
};