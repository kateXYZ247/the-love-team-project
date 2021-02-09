import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  userId: null,
  firstName: null,
  lastName: null,
  phone: null,
  address: null,
  language: null,
  productName: null,
  error: null,
  avail: true,
};

// const providerProfileStart = (state, action) => {
//   return updateObject(state, {});
// };
//
// const providerProfileSuccess = (state, action) => {
//   return updateObject(state, {
//     firstName: action.firstName,
//     lastName: action.lastName,
//     phone: action.phone,
//     address: action.address,
//     productName: action.productName,
//     avail: action.available,
//   });
// };
//
// const providerProfileFail = (state, action) => {
//   return updateObject(state, {});
// };
const switchStart = (state, action) => {
  return updateObject(state, {});
};
const switchSuccess = (state, action) => {
  return updateObject(state, {
    avail: action.avail,
  });
};
const switchFail = (state, action) => {
  return state;
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    // case actionTypes.PROVIDER_PROFILE_START:
    //   return providerProfileStart(state, action);
    // case actionTypes.PROVIDER_PROFILE_SUCCESS:
    //   return providerProfileSuccess(state, action);
    // case actionTypes.PROVIDER_PROFILE_FAIL:
    //   return providerProfileFail(state, action);
    case actionTypes.SWITCH_START:
      return switchStart(state, action);
    case actionTypes.SWITCH_SUCCESS:
      return switchSuccess(state, action);
    case actionTypes.SWITCH_FAIL:
      return switchFail(state, action);
    default:
      return state;
  }
};

export default reducer;
