import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";
import {
  NAV_BAR_ADMIN_PATH_ITEMS,
  NAV_BAR_DEFAULT_PATH_ITEMS,
  NAV_BAR_PROVIDER_PATH_ITEMS,
  NAV_BAR_USER_PATH_ITEMS,
  PATH_HOME,
} from "../../constant/path";
import { AUTH_ROLE } from "../../constant/auth";

const initialState = {
  path: PATH_HOME,
};

const validDefaultPaths = NAV_BAR_DEFAULT_PATH_ITEMS.map((item) => item.path);
const validUserPaths = NAV_BAR_USER_PATH_ITEMS.map((item) => item.path);
const validProviderPaths = NAV_BAR_PROVIDER_PATH_ITEMS.map((item) => item.path);
const validAdminPaths = NAV_BAR_ADMIN_PATH_ITEMS.map((item) => item.path);

const setPath = (state, action) => {
  const { role } = action;
  let { path } = action;
  if (role === AUTH_ROLE.user && !validUserPaths.includes(path)) {
    path = validUserPaths[0];
  } else if (
    role === AUTH_ROLE.provider &&
    !validProviderPaths.includes(path)
  ) {
    path = validProviderPaths[0];
  } else if (role === AUTH_ROLE.admin && !validProviderPaths.includes(path)) {
    path = validAdminPaths[0];
  } else if (role === null && !validDefaultPaths.includes(path)) {
    path = validDefaultPaths[0];
  }
  return updateObject(state, { path: path });
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
