import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
    userId: null,
    firstName: null,
    lastName: null,
    phone: null,
    address: null,
    error: null,
};

const profileUpdateStart = (state, action) => {
    return updateObject(state, {});
};

// filling the fields
const profileUpdateSuccess = (state, action) => {
    return updateObject(state, {
        firstName: action.firstName,
        lastName: action.lastName,
        address: action.address + ", " + action.zip,
        phone: action.phone,
    });
};

// what does this mean? how is it different from start
const profileUpdateFail = (state, action) => {
    return state;
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.USER_PROFILE_UPDATE_STATUS.start:
            return profileUpdateStart(state, action);
        case actionTypes.USER_PROFILE_UPDATE_STATUS.success:
            return profileUpdateSuccess(state, action);
        case actionTypes.USER_PROFILE_UPDATE_STATUS.fail:
            return profileUpdateFail(state, action);
        default:
            return state;
    }
};

export default reducer;