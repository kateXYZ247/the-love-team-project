import * as actionTypes from "./actionTypes";
import axios from "../../shared/axios_instance";
import {
    API_PATH_PROVIDER_DETAIL,
} from "../../constant/api";
import {setMessage} from "./message";
import {MESSAGE_TYPE} from "../../constant/message";


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

export const switchStart = () => {
    return {
        type: actionTypes.SWITCH_START,
    };
}
export const switchSuccess = () => {
    return {
        type: actionTypes.SWITCH_SUCCESS,
    };
}

export const switchFail = () => {
    return {
        type: actionTypes.SWITCH_FAIL,
    };
}

export const onSwitch = (userId, token, avail) => {
    return (dispatch) => {
        dispatch(switchStart);
        axios
            (API_PATH_PROVIDER_DETAIL + userId + "/availability", {
                headers: {
                    'Authorization': `token ${token}`
                },
                data: {
                    "isAvailable" : avail
                },
                method: 'put'
            })
            .then((response) => {
                console.log(response);
                const {successMsg} = response.data;
                dispatch(switchSuccess());
                dispatch(setMessage(MESSAGE_TYPE.info, successMsg));
            })
            .catch((error) => {
                console.log(error);
                dispatch(switchFail());
            });
    }
}
export const providerProfile = (userId, token) => {
    return (dispatch) => {
        dispatch(providerProfileStart);
        axios
            .get(API_PATH_PROVIDER_DETAIL + userId, {
                headers: {
                    'Authorization': `token ${token}`
                }
            })
            .then((response) => {
                // console.log(response);
            const {productName, provider} = response.data;
                dispatch(providerProfileSuccess(provider.firstName, provider.lastName, provider.phone, provider.address, productName.toString()));
            })
            .catch((error) => {
                dispatch(providerProfileFail());
            });
    };
};