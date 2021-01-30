import * as actionTypes from "./actionTypes";
import axios from "../../shared/axios_instance";

export const fetchProductsSuccess = (products) => {
  return {
    type: actionTypes.FETCH_PRODUCTS_SUCCESS,
    products: products,
  };
};

export const fetchProductsFail = (error) => {
  return {
    type: actionTypes.FETCH_PRODUCTS_FAIL,
    error: error,
  };
};

export const fetchProductsStart = () => {
  return {
    type: actionTypes.FETCH_PRODUCTS_START,
  };
};

export const fetchProducts = (token, userId) => {
  return (dispatch) => {
    dispatch(fetchProductsStart());
    axios
      .get("/products")
      .then((response) => {
        // console.log(response);
        const fetchedProducts = [];
        // for (let key in response.data) {
        //   fetchedProducts.push({ ...response.data[key], id: key });
        // }
        dispatch(fetchProductsSuccess(fetchedProducts));
      })
      .catch((error) => dispatch(fetchProductsFail(error)));
  };
};
