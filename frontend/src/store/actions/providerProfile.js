import * as actionTypes from "./actionTypes";
import axios from "../../shared/axios_instance";
import {
    API_PATH_PROVIDER_DETAIL,
} from "../../constant/api";


export const providerProfileSuccess = (firstName, lastName, phone, address) => {
    return {
        type: actionTypes.PROVIDER_PROFILE_SUCCESS,
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        address: address
    };
};

export const providerProfileFail = () => {
    return {
        type: actionTypes.PROVIDER_PROFILE_FAIL,
    };
};

export const providerProfileStart = () => {
    return {
        type: actionTypes.PROVIDER_PROFILE_START,
    };
};

export const providerProfile = () => {
    return (dispatch) => {
        dispatch(providerProfileStart);
        axios
            .get(API_PATH_PROVIDER_DETAIL + "1")
            .then((response) => {
            const {firstName, lastName, phone, address} = response.data;
                dispatch(providerProfileSuccess(firstName, lastName, phone, address));
            })
            .catch((error) => {
                dispatch(providerProfileFail());
            });
    };
};