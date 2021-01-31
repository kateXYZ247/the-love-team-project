import axios from "axios";
import { LOCAL_STORAGE_TOKEN_KEY } from "../constant/auth";

const instance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
});

// Set the AUTH token for any request
instance.interceptors.request.use(function (config) {
  const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});

export default instance;
