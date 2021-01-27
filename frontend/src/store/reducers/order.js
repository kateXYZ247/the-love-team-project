import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  error: null,
  loading: false,
  order: {
    services: [{ productId: -1 }, { productId: -2 }, { productId: -3 }],
  },
};

const addToCard = (state, action) => {
  const updatedServices = [...state.order.services, action.product];
  const oldPrice = state.order.price;
  const updatedOrder = updateObject(state.order, {
    services: updatedServices,
    price: oldPrice + action.product.price,
  });
  return updateObject(state, { order: updatedOrder });
};

const updateServiceTimeAddress = (state, action) => {
  const oldServices = state.order.services;
  const updatedServices = oldServices.map((service) =>
    updateObject(service, {
      startTime: action.time.startTime,
      endTime: action.time.endTime,
      address: action.address.address,
      apartment: action.address.apartment,
      pet: action.address.pet,
      direction: action.address.direction,
      addressType: action.address.addressType,
    })
  );
  return updateObject(state, {
    order: updateObject(state.order, { services: updatedServices }),
  });
};

const updatePaymentInfo = (state, action) => {
  return updateObject(state, {
    order: updateObject(state.order, { credit: action.creditCard }),
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ORDER_ADD_TO_CART:
      return addToCard(state, action);
    case actionTypes.ORDER_UPDATE_SERVICE_TIME_ADDRESS:
      return updateServiceTimeAddress(state, action);
    case actionTypes.ORDER_UPDATE_PAYMENT_INFO:
      return updatePaymentInfo(state, action);
    default:
      return state;
  }
};

export default reducer;
