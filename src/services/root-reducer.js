import {configureStore} from '@reduxjs/toolkit';

import ingredientsSlice from './actions/ingredients-slice';
import orderSlice from './actions/order-slice';
import ingredientSlice from './actions/ingredient-slice';

const store = configureStore({
  reducer: {

    ingredients: ingredientsSlice,
    order: orderSlice,
    ingredient: ingredientSlice,


  },
});

export default store;