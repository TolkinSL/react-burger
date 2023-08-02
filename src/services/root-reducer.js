import {configureStore} from '@reduxjs/toolkit';

import ingredientsSlice from './actions/ingredients-slice';
import orderSlice from './actions/order-slice';
import ingredientSlice from './actions/ingredient-slice';
import constructorSlice from './actions/constructor-slice';
import authorizationSlice from './actions/authorization-slice';

const store = configureStore({
  reducer: {
    ingredients: ingredientsSlice,
    order: orderSlice,
    ingredient: ingredientSlice,
    cart: constructorSlice,
    authorization: authorizationSlice,

  },
});

export default store;