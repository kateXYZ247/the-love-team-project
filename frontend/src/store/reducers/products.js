import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";
import { productList } from "../../constant/products";

const initialState = {
  error: false,
  message: null,
  loading: false,
  products: [],
};

const fetchProductsStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const fetchProductsSuccess = (state, action) => {
  return updateObject(state, { products: action.products, loading: false });
};

const fetchProductsFail = (state, action) => {
  return updateObject(state, {
    products: [...productList],
    loading: false,
    error: true,
    message: action.message,
  });
};

const clearMessage = (state, action) => {
  return updateObject(state, { error: false, message: null });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_PRODUCTS_START:
      return fetchProductsStart(state, action);
    case actionTypes.FETCH_PRODUCTS_SUCCESS:
      return fetchProductsSuccess(state, action);
    case actionTypes.FETCH_PRODUCTS_FAIL:
      return fetchProductsFail(state, action);
    case actionTypes.FETCH_PRODUCTS_CLEAR_MESSAGE:
      return clearMessage(state, action);
    default:
      return state;
  }
};

export default reducer;
