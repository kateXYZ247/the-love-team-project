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

const declineRequest = (state, action) => {
  return updateObject(state, {
    requests: state.requests.filter((_, i) => i !== action.removeIndex),
  });
};

const acceptRequestStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const acceptRequestSuccess = (state, action) => {
  return updateObject(state, {
    requests: state.requests.filter((_, i) => i !== action.index),
    loading: false,
  });
};

const acceptRequestFail = (state, action) => {
  return updateObject(state, {
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
    case actionTypes.PROVIDER_ACCEPT_REQUEST.start:
      return acceptRequestStart(state, action);
    case actionTypes.PROVIDER_ACCEPT_REQUEST.success:
      return acceptRequestSuccess(state, action);
    case actionTypes.PROVIDER_ACCEPT_REQUEST.fail:
      return acceptRequestFail(state, action);
    case actionTypes.PROVIDER_DECLINE_REQUEST:
      return declineRequest(state, action);
    default:
      return state;
  }
};

export default reducer;
