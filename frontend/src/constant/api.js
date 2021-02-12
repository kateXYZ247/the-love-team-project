export const API_PATH_USER_LOGIN = "/users/login";
export const API_PATH_USER_REGISTER = "/users/register";
export const API_PATH_USER_DETAIL = "/users/";

export const API_PATH_FETCH_PRODUCTS = "/products";
export const API_PATH_USER_PLACE_ORDER = "/orders";
export const API_PATH_FETCH_USER_ORDER = "/orders?userId=";
export const API_PATH_FETCH_USER_UPCOMING_ORDER = "/orders?userId=";

export const API_PATH_USER_UPDATE_ORDER = "/orders/";
export const API_PATH_USER_UPDATE_ACCOUNT = "/accounts";

export const API_PATH_PROVIDER_LOGIN = "/providers/login";
export const API_PATH_PROVIDER_DETAIL = "/providers/";
export const API_PATH_PROVIDER_FETCH_SERVICES = "/services/?providerId=";
export const API_PARAMETER_PROVIDER_FETCH_REQUESTS = "&status=requested";
export const API_PARAMETER_PROVIDER_FETCH_UPCOMING = "&status=upcoming";
export const API_PATH_PROVIDER_ACCEPT_REQUEST = "/services/";
export const API_PATH_PROVIDER_AVAILABILITY = "/availability";

export const WS_PATH_CONNECT = "/ws";
export const WS_PATH_USER = "/user/";
export const WS_PATH_REPLY = "/reply";
export const WS_PATH_PROVIDERS = "/topic/providers";

export const HTTP_STATUS_OK = 200;

export const GOOGLE_MAP_SCRIPT_URL = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_MAP_API_KEY}&libraries=places`;
export const GOOGLE_MAP_CALL_DELAY = 500;
