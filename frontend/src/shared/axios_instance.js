import axios from "axios";
import { LOCAL_STORAGE_TOKEN_KEY } from "../constant/auth";
import jwtDecode from "jwt-decode";
import store from "../index";
import { logout } from "../store/actions/auth";

const instance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
});

// Set the AUTH token for any request
instance.interceptors.request.use(function (config) {
  const token = sessionStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
  //const decodeToken = token ? jwtDecode(token) : "";
  //console.log("decoded token is", decodeToken);
  //console.log("is_user: " ,decodeToken.sub.toString().includes(':"user"'));
  //console.log("is_provider: " ,decodeToken.sub.toString().includes(':"provider"'));
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});

instance.interceptors.response.use(
  (response) =>
    new Promise((resolve, reject) => {
      resolve(response);
    }),
  (error) => {
    if (!error.response) {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
    if (error.response.status === 403) {
      const token = sessionStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
      const decodeToken = token ? jwtDecode(token) : "";
      if (decodeToken.sub.toString().includes(':"provider"')) {
        localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
        sessionStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
        store.dispatch(logout());
        //window.location ="/provider/login";
      } else if (decodeToken.sub.includes(':"user"')) {
        localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
        sessionStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
        store.dispatch(logout());
      } //else admin
    } else {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
  }
);

export default instance;
