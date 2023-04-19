import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [],
    bun: {},
};

const constructorSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action) {
            const cartItem = action.payload;
            if (cartItem.type !== 'bun') {
                state.items.push(cartItem);
            } else {
                state.bun = cartItem;
            }
        },
        resetItem(state) {
            state.bun = {};
            state.items = [];
        },
        removeItem(state, action) {
            state.items = state.items.filter((item) => item.id4 !== action.payload);
        }
    },
});

export const {addItem, resetItem, removeItem} = constructorSlice.actions;

export default constructorSlice.reducer;