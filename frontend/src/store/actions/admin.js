import * as actionTypes from "./actionTypes";
import axios from "../../shared/axios_instance";
import { API_PATH_ADMIN_FETCH_STATISTICS } from "../../constant/api";
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
        console.log(statList);
      })
      .catch((error) => {
        dispatch(fetchStatisticsFail());
        dispatch(setMessage(MESSAGE_TYPE.warning, error.message));
      });
  };
};
