import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";
import { productList } from "../../constant/products";

const initialState = {
    loading: false,
    statList: [],
}

const fetchStatisticsSuccess = (state, action) => {
    return updateObject(state, {
        statList: action.statList,
        loading: false,
    });
};

const fetchStatisticsFail = (state, action) => {
    return updateObject(state, {
        statList: [],
        loading: false,
    });
};

const fetchStatisticsStart = (state, action) => {
    return updateObject(state, {loading: true});
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_STATISTICS_START:
            return fetchStatisticsStart(state, action);
        case actionTypes.FETCH_STATISTICS_SUCCESS:
            return fetchStatisticsSuccess(state, action);
        case actionTypes.FETCH_STATISTICS_FAIL:
            return fetchStatisticsFail(state, action);
        default:
            return state;
    }
};

export default reducer;