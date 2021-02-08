import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";
import { PATH_HOME } from "../../constant/path";

const initialState = {
  path: PATH_HOME,
};

const setPath = (state, action) => {
  return updateObject(state, { path: action.path });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ROUTE_SET_PATH:
      return setPath(state, action);
    default:
      return state;
  }
};

export default reducer;
