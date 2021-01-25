import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  error: null,
  loading: false,
  order: [],
};

const addToCard = (state, action) => {
  return updateObject(state, [...state.order, action.product]);
};

const updateServiceTimeAddress = (state, action) => {
  return state;
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
