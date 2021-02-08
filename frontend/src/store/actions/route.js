import * as actionTypes from "./actionTypes";

export const setPath = (path) => {
  return {
    type: actionTypes.ROUTE_SET_PATH,
    path: path,
  };
};
