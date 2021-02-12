export { setPath } from "./route";

export {
  login,
  loginStart,
  loginSuccess,
  loginGetInfoFail,
  logoutAndMessage,
  setRedirectPath,
  disconnectWebSocket,
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
  userUpdateOrderStatus,
} from "./order";

export { fetchProducts } from "./products";

export { register, registerReset } from "./register";

export { clearMessage } from "./message";

export { onSwitch } from "./providerProfile";

export {
  fetchServices,
  clearFetchedServices,
  updateServiceStatus,
  declineRequest,
  addPushedRequest,
  clearPushedRequest,
} from "./provider";
