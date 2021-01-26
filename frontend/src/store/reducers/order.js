import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  error: null,
  loading: false,
  order: [],
};

const addToCard = (state, action) => {
  return updateObject(state, { order: [...state.order, action.product] });
};

const updateServiceTimeAddress = (state, action) => {
  console.log(action);
  const oldOrder = state.order;
  const updatedOrder = oldOrder.map((service) =>
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
  return updateObject(state, { order: updatedOrder });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ORDER_ADD_TO_CART:
      return addToCard(state, action);
    case actionTypes.ORDER_UPDATE_SERVICE_TIME_ADDRESS:
      return updateServiceTimeAddress(state, action);
    default:
      return state;
  }
};

export default reducer;
