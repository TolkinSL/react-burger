import {configureStore} from '@reduxjs/toolkit';
import { socketMiddleware } from './middleware/socket-middleware.js';

import ingredientsSlice from './actions/ingredients-slice';
import orderSlice from './actions/order-slice';
import ingredientSlice from './actions/ingredient-slice';
import constructorSlice from './actions/constructor-slice';
import authorizationSlice from './actions/authorization-slice';
import websocketSlice from "./actions/websocket-slice";

import { connect, disconnect, wsConnecting, wsOpen, wsClose, wsMessage, wsError } from './actions/websocket-slice';

const dataMiddleware = socketMiddleware({
  wsConnect: connect,
  wsDisconnect: disconnect,
  wsConnecting: wsConnecting,
  onOpen: wsOpen,
  onClose: wsClose,
  onError: wsError,
  onMessage: wsMessage,
});


const store = configureStore({
  reducer: {
    ingredients: ingredientsSlice,
    order: orderSlice,
    ingredient: ingredientSlice,
    cart: constructorSlice,
    authorization: authorizationSlice,
    wsData: websocketSlice,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(dataMiddleware);
  }
});

export default store;