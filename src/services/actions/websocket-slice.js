import { createSlice } from '@reduxjs/toolkit';

const websocketSlice = createSlice({
    name: 'wsData',
    initialState: {
        isConnected: false,
        isConnecting: false,
        isWsOpen: false,
        // messages: [],
        error: null,
        orders: [],
        total: 0,
        totalToday: 0,
    },
    reducers: {

        connect: (state) => {
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