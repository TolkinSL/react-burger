import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {getIngredientsApi} from '../../utils/api';

const initialState = {
  items: [],
  status: '',
};

export const getIngredients = createAsyncThunk(
    'ingredients/fetch',
    async () => {
      const response = await getIngredientsApi();
      return response.data;
    }
);

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
        .addCase(getIngredients.pending, (state) => {
          state.status = 'load';
          state.items = [];
        })
        .addCase(getIngredients.fulfilled, (state, actions) => {
          state.status = 'complete';
          state.items = actions.payload;
        })
        .addCase(getIngredients.rejected, (state) => {
          state.status = 'error';
          state.items = [];
        })
  },
});

export default ingredientsSlice.reducer;