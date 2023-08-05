import {getCookie} from "./cookie";

const BASE_URL = 'https://norma.nomoreparties.space/api';

export const getIngredientsApi = async () => {
    return await fetch(`${BASE_URL}/ingredients`)
        .then((res) => checkResponse(res));
};

export const getOrderApi = (itemsId) => {
    return fetch(`${BASE_URL}/orders`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            "ingredients": itemsId
        })
    })
        .then((res) => checkResponse(res));
};

export const registerApi = (user) => {
    return fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            name: user.name,
            email: user.email,
            password: user.password,
        }),
    })
        .then((res) => checkResponse(res));
};

export const loginApi = (user) => {
    return fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            email: user.email,
            password: user.password,
        }),
    })
        .then((res) => checkResponse(res));
};

export const restorePasswordApi = (user) => {
    return fetch(`${BASE_URL}/password-reset`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            email: user.email,
        }),
    })
        .then((res) => checkResponse(res));
};

export const resetPasswordApi = (values) => {
    return fetch(`${BASE_URL}/password-reset/reset`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            password: values.password,
            token: values.token,
        }),
    })
        .then((res) => checkResponse(res));
};

export const logoutApi = (token) => {
    return fetch(`${BASE_URL}/auth/logout`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            token: token,
        }),
    })
        .then((res) => checkResponse(res));
};

export function updateUserApi(user) {
    return fetch(`${BASE_URL}/auth/user`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            authorization: "Bearer " + getCookie("accessToken"),
        },
        body: JSON.stringify({
            name: user.name,
            email: user.email,
            password: user.password,
        }),
    })
        .then((res) => checkResponse(res));
}

const checkResponse = (res) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
};