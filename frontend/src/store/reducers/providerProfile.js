import * as actionTypes from "../actions/actionTypes"
import { updateObject } from "../../shared/utility";
import { LOCAL_STORAGE_TOKEN_KEY } from "../../constant/auth";
import { PATH_HOME } from "../../constant/path";

const initialState = {
    userId: null,
    firstName: null,
    lastName: null,
    phone: null,
    address: null,
    language: "English",
    service: null,
    error: null,
    loading: false,
};

const providerProfileStart = (state, action) => {
    return updateObject(state, {
        loading: true,
    });
};

const providerProfileSuccess = (state, action) => {
    return updateObject(state, {
        firstName: action.firstName,
        lastName: action.lastName,
        phone: action.phone,
        address: action.email,
        loading: false,

    });
};

const providerProfileFail = (state, action) => {
    return updateObject(state, {
        loading: false,
    });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
      case actionTypes.PROVIDER_PROFILE_START:
          return providerProfileStart(state, action);
      case actionTypes.PROVIDER_PROFILE_SUCCESS:
          return providerProfileSuccess(state, action);
      case actionTypes.PROVIDER_PROFILE_FAIL:
          return providerProfileFail(state, action);
      default:
          return state;
  }
};

export default reducer;