import * as actionTypes from "./actionTypes";
import axios from "../../shared/axios_instance";
import {
  API_PATH_USER_PLACE_ORDER,
  HTTP_STATUS_OK,
  API_PATH_FETCH_USER_ORDER,
  API_PATH_USER_UPDATE_SERVICE,
} from "../../constant/api";
import { updateObject } from "../../shared/utility";
import { setMessage } from "./message";
import { MESSAGE_TYPE } from "../../constant/message";
import { FETCH_ORDERS_TYPE } from "../../constant/order";


export const addToCart = (product) => {
  return {
    type: actionTypes.ORDER_ADD_TO_CART,
    product: product,
  };
};

export const deleteFromCart = (productIndex) => {
  return {
    type: actionTypes.ORDER_DELETE_FROM_CART,
    deleteIndex: productIndex,
  };
};

export const updateCart = () => {
  return {
    type: actionTypes.ORDER_UPDATE_CART,
  };
};

export const updateServiceTimeAddress = (startTime, address) => {
  return {
    type: actionTypes.ORDER_UPDATE_SERVICE_TIME_ADDRESS,
    startTime: startTime,
    address: address,
  };
};

export const switchToPayment = () => {
  return {
    type: actionTypes.ORDER_SWITCH_TO_PAYMENT,
  };
};

export const updatePaymentInfo = (creditCard) => {
  return {
    type: actionTypes.ORDER_UPDATE_PAYMENT_INFO,
    creditCard: creditCard,
  };
};

export const setBackStatus = () => {
  return {
    type: actionTypes.ORDER_SET_BACK_STATUS,
  };
};

export const resetStatus = () => {
  return {
    type: actionTypes.ORDER_RESET_STATUS,
  };
};

export const clearCart = () => {
  return {
    type: actionTypes.ORDER_CLEAR_CART,
  };
};

export const placeOrderStart = () => {
  return {
    type: actionTypes.ORDER_PLACE_ORDER_START,
  };
};

export const placeOrderSuccess = () => {
  return {
    type: actionTypes.ORDER_PLACE_ORDER_SUCCESS,
  };
};

export const placeOrderFail = () => {
  return {
    type: actionTypes.ORDER_PLACE_ORDER_FAIL,
  };
};

export const placeOrder = (order, userId) => {
  const requestBody = updateObject(order, {
    services: null,
    servs: order.services,
    userId: userId,
  });
  return (dispatch) => {
    dispatch(placeOrderStart());
    axios
      .post(API_PATH_USER_PLACE_ORDER, requestBody)
      .then((response) => {
        if (response.status === HTTP_STATUS_OK) {
          dispatch(placeOrderSuccess());
          dispatch(setMessage(MESSAGE_TYPE.success, response.data));
        } else {
          throw new Error(response.statusText);
        }
      })
      .catch((error) => {
        dispatch(placeOrderFail());
        dispatch(setMessage(MESSAGE_TYPE.error, error.message));
      });
  };
};

export const fetchOrdersSuccess = (type, orders) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    fetchType: type,
    orders: orders,
  };
};

export const fetchOrdersFail = (type) => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL,
    fetchType: type,
  };
};

export const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START,
  };
};

export const fetchOrders = (type, userId) => {
  return (dispatch) => {
    dispatch(fetchOrdersStart());
    let url = API_PATH_FETCH_USER_ORDER;
    switch (type) {
      case FETCH_ORDERS_TYPE.upcomingAppointments:
        url += userId
        // url += userId + API_PARAMETER_xxx;
        break;
      case FETCH_ORDERS_TYPE.historicalOrders:
        url += userId
        // url += userId + API_PARAMETER_xxx;
        break;
      default:
    }
    axios
      .get(url)
      .then((response) => {
        if (
          response.hasOwnProperty("data") &&
          response.data.hasOwnProperty("orderHistoryResponseBody") &&
          response.data.orderHistoryResponseBody.length > 0
        ) {
          const fetchedOrders = response.data.orderHistoryResponseBody;
          dispatch(fetchOrdersSuccess(type, fetchedOrders));
        } else {
          throw new Error("Invalid data!");
        }
      })
      .catch((error) => {
        dispatch(fetchOrdersFail(type));
        dispatch(setMessage(MESSAGE_TYPE.warning, error.message));
      });
  };
};

const userUpdateServiceStatusStart = (index) => {
  return {
    type: actionTypes.USER_UPDATE_SERVICE_STATUS.start,
    index: index,
  };
};

const userUpdateServiceStatusSuccess = (index, updatedStatus) => {
  return {
    type: actionTypes.USER_UPDATE_SERVICE_STATUS.success,
    index: index,
    updatedStatus: updatedStatus,
  };
};

// TODO API_PATH_USER_UPDATE_SERVICE
// const userUpdateServiceStatusFail = () => {
//   return {
//     type: actionTypes.USER_UPDATE_SERVICE_STATUS.fail,
//   };
// };

const userUpdateServiceStatusFail = (index, updatedStatus) => {
  return {
    type: actionTypes.USER_UPDATE_SERVICE_STATUS.fail,
    index: index,
    updatedStatus: updatedStatus,
  };
};

export const userUpdateServiceStatus = (
  serviceIndex,
  serviceId,
  userId,
  updatedStatus
) => {
  return (dispatch) => {
    dispatch(userUpdateServiceStatusStart());
    const data = {
      serviceId: serviceId,
      userId: userId,
      status: updatedStatus,
    };
    axios
      .patch(API_PATH_USER_UPDATE_SERVICE + serviceId, data)
      .then((response) => {
        if (response.status === HTTP_STATUS_OK) {
          dispatch(userUpdateServiceStatusSuccess(serviceIndex, updatedStatus));
          dispatch(
            setMessage(MESSAGE_TYPE.success, `Service ${updatedStatus}!`)
          );
        }
      })
      .catch((error) => {
        // TODO API_PATH_USER_UPDATE_SERVICE
        // dispatch(userUpdateServiceStatusFail());
        dispatch(userUpdateServiceStatusFail(serviceIndex, updatedStatus));

        dispatch(setMessage(MESSAGE_TYPE.warning, error.message));
      });
  };
};

