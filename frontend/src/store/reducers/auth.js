import * as actionTypes from "../actions/actionTypes";

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
  authRedirectPath: "/",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return state;
    case actionTypes.AUTH_SUCCESS:
      return state;
    case actionTypes.AUTH_FAIL:
      return state;
    case actionTypes.AUTH_LOGOUT:
      return state;
    default:
      return state;
  }
};

export default reducer;
