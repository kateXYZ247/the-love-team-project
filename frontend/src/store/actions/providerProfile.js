import * as actionTypes from "./actionTypes";
import axios from "../../shared/axios_instance";
import {
    API_PATH_PROVIDER_DETAIL,
} from "../../constant/api";


export const providerProfileSuccess = (firstName, lastName, phone, address, productName) => {
    return {
        type: actionTypes.PROVIDER_PROFILE_SUCCESS,
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        address: address,
        productName: productName
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

export const providerProfile = (userId, token) => {
    return (dispatch) => {
        dispatch(providerProfileStart);
        // const token = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ7XCJ1c2VySWRcIjpcIjFcIixcInJvbGVcIjpcInByb3ZpZGVyXCJ9IiwiZXhwIjoxNjEzMDIyNDMxfQ.q8f4XfbnM8w5vRzNdkAryxJufTdlhVW6oFFXQYrE3uhcN1JKPj5Z-IKpDoJ27JiMHwXXxfoF2BWI3wB52NfK3w'
        axios
            .get(API_PATH_PROVIDER_DETAIL + userId, {
                headers: {
                    'Authorization': `token ${token}`
                }
            })
            .then((response) => {
                // console.log(response);
            const {productName, provider} = response.data;
            console.log(productName);
            console.log(provider.firstName);
                dispatch(providerProfileSuccess(provider.firstName, provider.lastName, provider.phone, provider.address, productName.toString()));
            })
            .catch((error) => {
                dispatch(providerProfileFail());
            });
    };
};