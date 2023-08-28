export const getBun = (state) => state.cart.bun;
export const getMains = (state) => state.cart.items;
export const getIngredientsItems = (state)  => state.ingredients.items;
export const getCartBun = (state) =>  state.cart.bun;
export const getCartItems = (state) => state.cart.items;
export const getIngredientsStatus = (state) => state.ingredients.status;
export const getIngredientItem = (state) => state.ingredient.item;
export const getOrderNumber = (state) => state.order.orderNumber;
export const authUserData = (state) => state.authorization.userData;
export const authIsLogin = (state) => state.authorization.isLogin;