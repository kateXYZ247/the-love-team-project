import * as actionTypes from "./actionTypes";

export const setPath = (role, path) => {
  return {
    type: actionTypes.ROUTE_SET_PATH,
    role: role,
    path: path,
  };
};
