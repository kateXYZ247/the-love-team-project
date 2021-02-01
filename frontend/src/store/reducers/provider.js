import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  loading: false,
  requests: [],
};

const fetchRequestsStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const fetchRequestsSuccess = (state, action) => {
  return updateObject(state, { requests: action.requests, loading: false });
};

const fetchRequestsFail = (state, action) => {
  return updateObject(state, {
    requests: [],
    loading: false,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PROVIDER_FETCH_REQUESTS.start:
      return fetchRequestsStart(state, action);
    case actionTypes.PROVIDER_FETCH_REQUESTS.success:
      return fetchRequestsSuccess(state, action);
    case actionTypes.PROVIDER_FETCH_REQUESTS.fail:
      return fetchRequestsFail(state, action);
    default:
      return state;
  }
};

export default reducer;
