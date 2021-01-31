import * as actionTypes from "../actions/actionTypes";
import { calculateTotalPrice, updateObject } from "../../shared/utility";
import {
  addressTypes,
  ORDER_STATUS,
  sampleOrderServices,
  sampleOrderTotalPrice,
} from "../../constant/order";

const initialState = {
  error: null,
  loading: false,
  status: ORDER_STATUS.ADD_TO_CART,
  order: {
    startTime: new Date(),
    address: "",
    apartment: "",
    pet: "",
    direction: "",
    addressType: addressTypes[0].value,
    services: sampleOrderServices,
    totalPrice: sampleOrderTotalPrice,
    // services: [{ productId: -1 }, { productId: -2 }, { productId: -3 }],
    // totalPrice: 0,
  },
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
      pet: action.address.pet,
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
      pet: oldOrder.pet,
      direction: oldOrder.direction,
      addressType: oldOrder.addressType,
    });
  });
  const updatedOrder = updateObject(state.order, {
    credit: action.creditCard,
    services: updatedServices,
  });
  console.log(updatedOrder);
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
    default:
      return state;
  }
};

export default reducer;
