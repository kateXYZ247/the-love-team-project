import * as actionTypes from "./actionTypes";
import axios from "../../shared/axios_instance";
import { productList } from "../../constant/homepage";
import { API_PATH_FETCH_PRODUCTS } from "../../constant/api";

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
      .get(API_PATH_FETCH_PRODUCTS)
      .then((response) => {

        let fetchedProducts = [...productList];
        if (
          response.hasOwnProperty("data") &&
          response.data.hasOwnProperty("products") &&
          response.data.products.length > 0
        ) {
          fetchedProducts = [...response.data.products];
        }

        dispatch(fetchProductsSuccess(fetchedProducts));
      })
      .catch((error) => {
        dispatch(fetchProductsFail(error));
      });
  };
};
