import * as actionTypes from "./actionTypes";
import axios from "../../shared/axios_instance";
import {
  API_PATH_ADMIN_FETCH_STATISTICS,
  API_PATH_ADMIN_FETCH_GEO,
} from "../../constant/api";
import { setMessage } from "./message";
import { MESSAGE_TYPE } from "../../constant/message";

const fetchStatisticsSuccess = (statList) => {
  return {
    type: actionTypes.FETCH_STATISTICS_SUCCESS,
    statList: statList,
  };
};

const fetchStatisticsFail = () => {
  return {
    type: actionTypes.FETCH_STATISTICS_FAIL,
  };
};

const fetchStatisticsStart = () => {
  return {
    type: actionTypes.FETCH_STATISTICS_START,
  };
};

export const fetchStatistics = (userId) => {
  return (dispatch) => {
    dispatch(fetchStatisticsStart());
    axios
      .get(API_PATH_ADMIN_FETCH_STATISTICS + userId)
      .then((response) => {
        let statList = [];
        if (
          response.hasOwnProperty("data") &&
          response.data.hasOwnProperty("total") &&
          response.data.hasOwnProperty("statList") &&
          response.data.statList.length > 0 &&
          response.data.total > 0
        ) {
          statList = [...response.data.statList];
          statList.forEach((item) => {
            item.counts = (100 * item.counts) / response.data.total;
          });
        }
        dispatch(fetchStatisticsSuccess(statList));
      })
      .catch((error) => {
        dispatch(fetchStatisticsFail());
        dispatch(setMessage(MESSAGE_TYPE.warning, error.message));
      });
  };
};

const fetchGeoSuccess = (geoList) => {
  return {
    type: actionTypes.FETCH_GEO_SUCCESS,
    geoList: geoList,
  };
};

const fetchGeoFail = () => {
  return {
    type: actionTypes.FETCH_GEO_FAIL,
  };
};

const fetchGeoStart = () => {
  return {
    type: actionTypes.FETCH_GEO_START,
  };
};

export const fetchGeo = (userId) => {
  return (dispatch) => {
    dispatch(fetchGeoStart());
    axios
      .get(API_PATH_ADMIN_FETCH_GEO + userId)
      .then((response) => {
        let geoList = [];
        if (
          response.hasOwnProperty("data") &&
          response.data.hasOwnProperty("allGeoList")
        ) {
          geoList = [...response.data.allGeoList];
        }
        dispatch(fetchGeoSuccess(geoList));
      })
      .catch((error) => {
        dispatch(fetchGeoFail());
        dispatch(setMessage(MESSAGE_TYPE.warning, error.message));
      });
  };
};
