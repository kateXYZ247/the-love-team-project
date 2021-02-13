export { setPath } from "./route";

export {
  login,
  loginStart,
  loginSuccess,
  loginGetInfoFail,
  logoutAndMessage,
  setRedirectPath,
  disconnectWebSocket,
  providerUpdateLocation,
} from "./auth";

export {
  addToCart,
  deleteFromCart,
  updateCart,
  updateServiceTimeAddress,
  switchToPayment,
  updatePaymentInfo,
  placeOrder,
  setBackStatus,
  resetStatus,
  clearCart,
  fetchOrders,
  clearFetchedOrders,
  userUpdateOrderStatus,
} from "./order";

export { fetchProducts } from "./products";

export { register, registerReset } from "./register";

export { setMessage, clearMessage } from "./message";

export { onSwitch } from "./providerProfile";

export {
  fetchServices,
  clearFetchedServices,
  updateServiceStatus,
  declineRequest,
  addPushedRequest,
  clearPushedRequest,
} from "./provider";

export {
  fetchStatistics,
  fetchGeo,
} from "./admin";
