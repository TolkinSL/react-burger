import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  item: {},
};

const ingredientSlice = createSlice({
  name: 'ingredient',
  initialState,
  reducers: {
    setItemIngredient(state, action) {
      state.item = action.payload;
    },
  },
});

export const {setItemIngredient} = ingredientSlice.actions;
export default ingredientSlice.reducer;
