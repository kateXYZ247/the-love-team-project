import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";
import { PROVIDER_FETCH_SERVICES_TYPE } from "../../constant/provider";
import { SERVICE_STATUS, SERVICE_UPDATE_SOURCE } from "../../constant/service";

const initialState = {
  loading: false,
  requests: [],
  services: [],
  histories: [],
  pushedRequests: [],
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
  if (action.source === SERVICE_UPDATE_SOURCE.fetchedRequests) {
    return updateObject(state, {
      requests: state.requests.filter((_, i) => i !== action.removeIndex),
    });
  } else {
    return updateObject(state, {
      pushedRequests: state.pushedRequests.filter(
        (_, i) => i !== action.removeIndex
      ),
    });
  }
};

const updateServiceStatusStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const updateServiceStatusSuccess = (state, action) => {
  if (action.updatedStatus === SERVICE_STATUS.accepted) {
    // remove from requests[]/pushedRequests[]
    if (action.source === SERVICE_UPDATE_SOURCE.fetchedRequests) {
      return updateObject(state, {
        requests: state.requests.filter((_, i) => i !== action.index),
        loading: false,
      });
    } else {
      return updateObject(state, {
        pushedRequests: state.pushedRequests.filter(
          (_, i) => i !== action.index
        ),
        loading: false,
      });
    }
  } else if (action.updatedStatus === SERVICE_STATUS.started) {
    // update service status in services[]
    const updatedServices = state.services.map((s, i) =>
      i === action.index ? updateObject(s, { status: action.updatedStatus }) : s
    );
    return updateObject(state, {
      services: updatedServices,
      loading: false,
    });
  } else if (
    action.updatedStatus === SERVICE_STATUS.canceled ||
    action.updatedStatus === SERVICE_STATUS.ended
  ) {
    // remove from services[]
    return updateObject(state, {
      services: state.services.filter((_, i) => i !== action.index),
      loading: false,
    });
  }
  return updateObject(state, { loading: false });
};

const updateServiceStatusFail = (state, action) => {
  return updateObject(state, {
    loading: false,
  });
};

const addPushedRequest = (state, action) => {
  const { service } = action;
  const newRequest = updateObject(service, {
    startTime: new Date(service.startTime),
    endTime: new Date(service.endTime),
  });
  return updateObject(state, {
    pushedRequests: [...state.pushedRequests, newRequest],
  });
};

const clearPushedRequest = (state, action) => {
  return updateObject(state, { pushedRequests: [] });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PROVIDER_FETCH_SERVICES.start:
      return fetchServicesStart(state, action);
    case actionTypes.PROVIDER_FETCH_SERVICES.success:
      return fetchServicesSuccess(state, action);
    case actionTypes.PROVIDER_FETCH_SERVICES.fail:
      return fetchServicesFail(state, action);
    case actionTypes.PROVIDER_UPDATE_SERVICE_STATUS.start:
      return updateServiceStatusStart(state, action);
    case actionTypes.PROVIDER_UPDATE_SERVICE_STATUS.success:
      return updateServiceStatusSuccess(state, action);
    case actionTypes.PROVIDER_UPDATE_SERVICE_STATUS.fail:
      return updateServiceStatusFail(state, action);
    case actionTypes.PROVIDER_DECLINE_REQUEST:
      return declineRequest(state, action);
    case actionTypes.PROVIDER_ADD_PUSHED_REQUEST:
      return addPushedRequest(state, action);
    case actionTypes.PROVIDER_CLEAR_PUSHED_REQUEST:
      return clearPushedRequest(state, action);
    default:
      return state;
  }
};

export default reducer;
