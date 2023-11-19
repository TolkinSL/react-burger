import {createSlice, ActionCreatorWithPayload, ActionCreatorWithoutPayload} from '@reduxjs/toolkit';
import {TwsOrders} from "../../utils/types";

const initialState: TwsOrders = {
    isConnected: false,
    isConnecting: false,
    isWsOpen: false,
    error: false,
    orders: [],
    total: 0,
    totalToday: 0,
};

const websocketSlice = createSlice({
    name: 'wsData',

    initialState,
    reducers: {

        connect: (state, action) => {
            state.isConnected = true;
        },
        disconnect: (state) => {
            state.isConnected = false;
        },
        wsConnecting: (state) => {
            state.isConnecting = true;
        },
        wsOpen: (state) => {
            state.isConnecting = false;
            state.isWsOpen = true;
        },
        wsClose: (state) => {
            state.isConnected = false;
            state.isWsOpen = false;
            state.orders = [];
        },
        wsMessage: (state, action) => {
            // state.messages = action.payload;
            state.orders = action.payload.orders;
            state.total = action.payload.total;
            state.totalToday = action.payload.totalToday;
        },
        wsError: (state, action) => {
            state.error = action.payload;
        },
    },
});

// Экспорт действий
export const {
    connect,
    disconnect,
    wsConnecting,
    wsOpen,
    wsClose,
    wsMessage,
    wsError,
} = websocketSlice.actions;

// Экспорт редюсера
export default websocketSlice.reducer;