import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";
import { productList } from "../../constant/products";

const initialState = {
  error: null,
  loading: false,
  products: [],
};

function fetchProductsStart(state, action) {
  return updateObject(state, { loading: true });
}

function fetchProductsSuccess(state, action) {
  return updateObject(state, { products: action.products, loading: false });
}

function fetchProductsFail(state, action) {
  return updateObject(state, { products: [...productList], loading: false });
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_PRODUCTS_START:
      return fetchProductsStart(state, action);
    case actionTypes.FETCH_PRODUCTS_SUCCESS:
      return fetchProductsSuccess(state, action);
    case actionTypes.FETCH_PRODUCTS_FAIL:
      return fetchProductsFail(state, action);
    default:
      return state;
  }
};

export default reducer;
