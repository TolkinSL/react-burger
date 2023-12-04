import PropTypes from "prop-types";

export const itemsType = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  calories: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  proteins: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  image_large: PropTypes.string.isRequired,
  image_mobile: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  __v: PropTypes.number.isRequired,
});

export type TwsOrders = {
  isConnected: boolean;
  isConnecting: boolean;
  isWsOpen: boolean;
  error: boolean;
  orders: TwsOrder[];
  total: number;
  totalToday: number;
}

export type TwsOrder = {
  _id: string;
  status: string | "pending" | "done";
  name: string;
  number: number;
  ingredients: string[];
  createdAt: string;
  updatedAt: string;
};

export type TUserData = {
  [key: string]: string,
}

export type TIngredient = {
  _id: string;
  id4: string;
  type: string;
  name: string;
  price: number;
  fat: number;
  calories: number;
  carbohydrates: number;
  proteins: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
};

export type TStateConstructor = {
  items: TIngredient[],
  bun: TIngredient,
};

export type TInitialState = {
  userData: {[key: string]: string},
  isLoad: boolean,
  isLogin: boolean,
  error: boolean,
  success: boolean,
};