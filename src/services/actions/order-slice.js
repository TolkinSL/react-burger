import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {getOrderApi} from '../../utils/api';

const initialState = {
  orderNumber: 0,
  status: '',
};

export const getOrder = createAsyncThunk(
    'orderNumber/fetch',
    async (itemsId) => {
      const res = await getOrderApi(itemsId);
      return res.order.number;
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
  },
});

export default orderSlice.reducer;