import { createSlice } from '@reduxjs/toolkit';
import {TIngredient, TStateConstructor} from "../../utils/types";

const initialState: TStateConstructor = {
    items: [],
    bun: {
        _id: '',
        id4: '',
        type: '',
        name: '',
        price: 0,
        fat: 0,
        calories: 0,
        carbohydrates: 0,
        proteins: 0,
        image: '',
        image_mobile: '',
        image_large: '',
        __v: 0,
    },
};

const constructorSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action) {
            const cartItem: TIngredient = action.payload;
            // console.log(cartItem);
            if (cartItem.type !== 'bun') {
                state.items.push(cartItem);
            } else {
                state.bun = cartItem;
            }
        },
        resetItem(state) {
            state.bun = {
                _id: '',
                id4: '',
                type: '',
                name: '',
                price: 0,
                fat: 0,
                calories: 0,
                carbohydrates: 0,
                proteins: 0,
                image: '',
                image_mobile: '',
                image_large: '',
                __v: 0,
            };
            state.items = [];
        },
        removeItem(state, action) {
            state.items = state.items.filter((item) => item.id4 !== action.payload);
        },
        moveItem(state, action) {
            const dragIndex = action.payload.dragIndex;
            const hoverIndex = action.payload.hoverIndex;
            const dragIngredient: TIngredient = action.payload.dragIngredient;
            state.items.splice(dragIndex, 1);
            state.items.splice(hoverIndex, 0, dragIngredient);
        },
    },
});

export const {addItem, resetItem, removeItem, moveItem} = constructorSlice.actions;

export default constructorSlice.reducer;