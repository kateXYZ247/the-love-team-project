import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";
import { PROVIDER_FETCH_SERVICES_TYPE } from "../../constant/provider";

const initialState = {
  loading: false,
  requests: [],
  services: [],
  histories: [],
};

const fetchServicesStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const fetchServicesSuccess = (state, action) => {
  if (action.fetchType === PROVIDER_FETCH_SERVICES_TYPE.requests) {
    return updateObject(state, { requests: action.services, loading: false });
  } else if (
    action.fetchType === PROVIDER_FETCH_SERVICES_TYPE.upcomingServices
  ) {
    return updateObject(state, { services: action.services, loading: false });
  } else if (
    action.fetchType === PROVIDER_FETCH_SERVICES_TYPE.historicalServices
  ) {
    return updateObject(state, { histories: action.services, loading: false });
  }
  return updateObject(state, { loading: false });
};

const fetchServicesFail = (state, action) => {
  if (action.fetchType === PROVIDER_FETCH_SERVICES_TYPE.requests) {
    return updateObject(state, { requests: [], loading: false });
  } else if (
    action.fetchType === PROVIDER_FETCH_SERVICES_TYPE.upcomingServices
  ) {
    return updateObject(state, { services: [], loading: false });
  } else if (
    action.fetchType === PROVIDER_FETCH_SERVICES_TYPE.historicalServices
  ) {
    return updateObject(state, { histories: [], loading: false });
  }
  return updateObject(state, { loading: false });
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
    case actionTypes.PROVIDER_FETCH_SERVICES.start:
      return fetchServicesStart(state, action);
    case actionTypes.PROVIDER_FETCH_SERVICES.success:
      return fetchServicesSuccess(state, action);
    case actionTypes.PROVIDER_FETCH_SERVICES.fail:
      return fetchServicesFail(state, action);
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
