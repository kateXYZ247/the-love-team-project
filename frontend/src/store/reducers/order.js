import * as actionTypes from "../actions/actionTypes";
import { calculateTotalPrice, updateObject } from "../../shared/utility";
import {
  addressTypes,
  ORDER_STATUS,
  sampleOrderServices,
  sampleOrderTotalPrice,
  sampleOrderHistory,
  sampleUpcomingAppointment,
  FETCH_ORDERS_TYPE
} from "../../constant/order";
import { SERVICE_STATUS } from "../../constant/service";

const initialState = {
  error: false,
  loading: false,
  status: ORDER_STATUS.ADD_TO_CART,
  order: {
    startTime: new Date(),
    address: "",
    apartment: "",
    pets: "",
    note: "",
    direction: "",
    addressType: addressTypes[0].value,
    services: sampleOrderServices,
    totalPrice: sampleOrderTotalPrice,
  },
  orderHistory: [],
  upcomingServices: [],
};

const fetchOrdersStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const fetchOrdersSuccess = (state, action) => {
  if (
    action.fetchType === FETCH_ORDERS_TYPE.upcomingAppointments
  ) {

    const upcomingOrders = action.orders.filter(order => order.status === "accepted")
    let services = []
    for (const order of upcomingOrders) {
      services = services.concat(order.servs);
    }

    return updateObject(state, {
      upcomingServices: services,
      loading: false
    });
  } else if (
    action.fetchType === FETCH_ORDERS_TYPE.historicalOrders
  ) {
    return updateObject(state, {
      orderHistory: action.orders,
      loading: false
    });
  }
  return updateObject(state, { loading: false });
};

const fetchOrdersFail = (state, action) => {

  if (
    action.fetchType === FETCH_ORDERS_TYPE.upcomingAppointments
  ) {
    return updateObject(state, {
      appointments: sampleUpcomingAppointment,
      loading: false,
    });
  } else if (
    action.fetchType === FETCH_ORDERS_TYPE.historicalOrders
  ) {
    return updateObject(state, {
      orderHistory: sampleOrderHistory,
      loading: false,
    });
  }
  return updateObject(state, {
    orderHistory: sampleOrderHistory,
    appointments: sampleUpcomingAppointment,
    loading: false,
  });
};


const addToCart = (state, action) => {
  const updatedServices = [...state.order.services, action.product];
  const updatedTotalPrice = calculateTotalPrice(updatedServices);
  const updatedOrder = updateObject(state.order, {
    services: updatedServices,
    totalPrice: updatedTotalPrice,
  });
  return updateObject(state, { order: updatedOrder });
};

const deleteFromCart = (state, action) => {
  const oldServices = state.order.services;
  const updatedServices = [
    ...oldServices.slice(0, action.deleteIndex),
    ...oldServices.slice(action.deleteIndex + 1),
  ];
  const updatedTotalPrice = calculateTotalPrice(updatedServices);
  const updatedStatus =
    updatedServices.length === 0 ? ORDER_STATUS.ADD_TO_CART : state.status;
  return updateObject(state, {
    order: updateObject(state.order, {
      services: updatedServices,
      totalPrice: updatedTotalPrice,
    }),
    status: updatedStatus,
  });
};

const updateCart = (state, action) => {
  return updateObject(state, {
    status: ORDER_STATUS.FILL_DATE_ADDRESS,
  });
};

const updateServiceTimeAddress = (state, action) => {
  return updateObject(state, {
    order: updateObject(state.order, {
      startTime: action.startTime,
      address: action.address.address,
      apartment: action.address.apartment,
      pets: action.address.pets,
      direction: action.address.direction,
      addressType: action.address.addressType,
    }),
  });
};

const switchToPayment = (state, action) => {
  return updateObject(state, {
    status: ORDER_STATUS.FILL_PAYMENT,
  });
};

// update payment info and book
const updatePaymentInfo = (state, action) => {
  const oldOrder = state.order;
  const oldServices = oldOrder.services;
  const startTime = oldOrder.startTime;
  const updatedServices = oldServices.map((service) => {
    let endTime = new Date(startTime);
    endTime.setMinutes(endTime.getMinutes() + service.duration);
    return updateObject(service, {
      startTime: startTime,
      endTime: endTime,
      address: oldOrder.address,
      apartment: oldOrder.apartment,
      pets: oldOrder.pets,
      direction: oldOrder.direction,
      addressType: oldOrder.addressType,
    });
  });
  const updatedOrder = updateObject(state.order, {
    credit: action.creditCard,
    services: updatedServices,
  });
  return updateObject(state, {
    order: updatedOrder,
  });
};

const setBackStatus = (state, action) => {
  const oldStatus = state.status;
  let updatedStatus = ORDER_STATUS.ADD_TO_CART;
  if (oldStatus === ORDER_STATUS.FILL_PAYMENT) {
    updatedStatus = ORDER_STATUS.FILL_DATE_ADDRESS;
  }
  return updateObject(state, {
    status: updatedStatus,
  });
};

const resetStatus = (state, action) => {
  return updateObject(state, {
    status: ORDER_STATUS.ADD_TO_CART,
  });
};

const clearCart = (state, action) => {
  return updateObject(state, initialState);
};

export const placeOrderSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    status: ORDER_STATUS.CONFIRMED,
    order: initialState.order,
  });
};

export const placeOrderFail = (state, action) => {
  return updateObject(state, { loading: false });
};

export const placeOrderStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const userUpdateServiceStatusStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const userUpdateServiceStatusSuccess = (state, action) => {
  if (
    action.updatedStatus === SERVICE_STATUS.canceled ||
    action.updatedStatus === SERVICE_STATUS.ended
  ) {
    // remove from services[]
    return updateObject(state, {
      upcomingServices: state.upcomingServices.filter((_, i) => i !== action.index),
      loading: false,
    });
  }
  return updateObject(state, { loading: false });
};

const userUpdateServiceStatusFail = (state, action) => {
  // TODO API_PATH_USER_UPDATE_SERVICE
  //   return updateObject(state, {
  //     loading: false,
  //   });
  // };

  if (
    action.updatedStatus === SERVICE_STATUS.canceled ||
    action.updatedStatus === SERVICE_STATUS.ended
  ) {
    // remove from services[]
    return updateObject(state, {
      upcomingServices: state.upcomingServices.filter((_, i) => i !== action.index),
      loading: false,
    });
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ORDER_ADD_TO_CART:
      return addToCart(state, action);
    case actionTypes.ORDER_DELETE_FROM_CART:
      return deleteFromCart(state, action);
    case actionTypes.ORDER_UPDATE_CART:
      return updateCart(state, action);
    case actionTypes.ORDER_UPDATE_SERVICE_TIME_ADDRESS:
      return updateServiceTimeAddress(state, action);
    case actionTypes.ORDER_SWITCH_TO_PAYMENT:
      return switchToPayment(state, action);
    case actionTypes.ORDER_UPDATE_PAYMENT_INFO:
      return updatePaymentInfo(state, action);
    case actionTypes.ORDER_SET_BACK_STATUS:
      return setBackStatus(state, action);
    case actionTypes.ORDER_RESET_STATUS:
      return resetStatus(state, action);
    case actionTypes.ORDER_CLEAR_CART:
      return clearCart(state, action);
    case actionTypes.ORDER_PLACE_ORDER_START:
      return placeOrderStart(state, action);
    case actionTypes.ORDER_PLACE_ORDER_SUCCESS:
      return placeOrderSuccess(state, action);
    case actionTypes.ORDER_PLACE_ORDER_FAIL:
      return placeOrderFail(state, action);
    case actionTypes.FETCH_ORDERS_START:
      return fetchOrdersStart(state, action);
    case actionTypes.FETCH_ORDERS_SUCCESS:
      return fetchOrdersSuccess(state, action);
    case actionTypes.FETCH_ORDERS_FAIL:
      return fetchOrdersFail(state, action);
    case actionTypes.USER_UPDATE_SERVICE_STATUS.start:
      return userUpdateServiceStatusStart(state, action);
    case actionTypes.USER_UPDATE_SERVICE_STATUS.success:
      return userUpdateServiceStatusSuccess(state, action);
    case actionTypes.USER_UPDATE_SERVICE_STATUS.fail:
      return userUpdateServiceStatusFail(state, action);
    default:
      return state;
  }
};

export default reducer;
