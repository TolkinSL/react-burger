import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {getCurrentOrderApi, getOrderApi} from '../../utils/api';
import {TInitialOrder} from "../../utils/types";

const initialState: TInitialOrder = {
    orderNumber: 0,
    status: '',
    currentOrder: {},
};

export const getOrder = createAsyncThunk(
    'orderNumber/fetch',
    async (itemsId: string[]) => {
        const res = await getOrderApi(itemsId);
        return res.order.number;
    }
);

export const getCurrentOrder = createAsyncThunk(
    'currentOrder/fetch',
    async (number: string) => {
        const res = await getCurrentOrderApi(number);
        return res;
    }
);

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getOrder.pending, (state) => {
                state.status = 'load';
                state.orderNumber = 0;
            })
            .addCase(getOrder.fulfilled, (state, actions) => {
                state.status = 'complete';
                state.orderNumber = actions.payload;
            })
            .addCase(getOrder.rejected, (state) => {
                state.status = 'error';
                state.orderNumber = 0;
            })
            .addCase(getCurrentOrder.pending, (state) => {
                state.status = 'load';
                state.currentOrder = {};
            })
            .addCase(getCurrentOrder.fulfilled, (state, actions) => {
                state.status = 'complete';
                state.currentOrder = actions.payload.orders[0];
            })
            .addCase(getCurrentOrder.rejected, (state) => {
                state.status = 'error';
                state.currentOrder = {};
            })
    },
});

export default orderSlice.reducer;