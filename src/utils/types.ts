import PropTypes from "prop-types";
import {ReactElement,} from "react";

export const itemsType = PropTypes.shape({
    _id: PropTypes.string.isRequired,
    calories: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    proteins: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,
    image_mobile: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    __v: PropTypes.number.isRequired,
});

export type TwsOrders = {
    isConnected: boolean;
    isConnecting: boolean;
    isWsOpen: boolean;
    error: boolean;
    orders: TwsOrder[];
    total: number;
    totalToday: number;
}

export type TwsOrder = {
    _id: string;
    status: string | "pending" | "done";
    name: string;
    number: number;
    ingredients: string[];
    createdAt: string;
    updatedAt: string;
};

export type TFetchData = {
    // [key: string]: string;
    name?: string;
    email?: string;
    password?: string;
    ingredients?: string[];
    token?: string;
}

export type TIngredient = {
    _id: string;
    id4: string;
    type: string;
    name: string;
    price: number;
    fat: number;
    calories: number;
    carbohydrates: number;
    proteins: number;
    image: string;
    image_mobile: string;
    image_large: string;
    __v: number;
};

export type TStateConstructor = {
    items: TIngredient[],
    bun: TIngredient,
};

export type TInitialState = {
    userData: { [key: string]: string },
    isLoad: boolean,
    isLogin: boolean,
    error: boolean,
    success: boolean,
};

export type TInitialIngredients = {
    items: TIngredient[],
    status: string,
};

export type TError = {
    response: {
        data: {
            message: string;
        }
    }
};

export type TModal = {
    closeModal: () => void;
    children?: JSX.Element;
};

export type TProtected = {
    children: JSX.Element,
}

export type TIngredientList = {
    openModal: () => void;
    count: number;
    item: TIngredient;
};