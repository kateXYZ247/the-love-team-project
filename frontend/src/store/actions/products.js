import * as actionTypes from "./actionTypes";
import axios from "../../shared/axios_instance";
import { productList } from "../../constant/homepage";

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
        let fetchedProducts = [...productList];
        if (
          response.hasOwnProperty("data") &&
          response.data.hasOwnProperty("productList") &&
          response.data.productList.length > 0
        ) {
          fetchedProducts = [...response.data.productList];
        }
        dispatch(fetchProductsSuccess(fetchedProducts));
      })
      .catch((error) => {
        dispatch(fetchProductsFail(error));
      });
  };
};
