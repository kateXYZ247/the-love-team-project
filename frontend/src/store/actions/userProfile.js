import * as actionTypes from "./actionTypes";
import axios from "../../shared/axios_instance";
import {
    API_PATH_USER_DETAIL,
    API_PATH_USER_UPDATE_ACCOUNT,
} from "../../constant/api";
import { setMessage } from "./message";
import { MESSAGE_TYPE } from "../../constant/message";
import {switchFail, switchSuccess} from "./providerProfile";

// export const profileUpdateStart = () => {
//     return {
//         type: actionTypes.USER_PROFILE_UPDATE_STATUS.start,
//     };
// };
//
// // is this the correct way to use it?
// export const profileUpdateSuccess = (firstName, lastName, address, zip, phone) => {
//     return {
//         type: actionTypes.USER_PROFILE_UPDATE_STATUS.success,
//         firstName: firstName,
//     };
// };
//
// // do we have to pass in errors?
// export const profileUpdateFail = () => {
//     return {
//         type: actionTypes.USER_PROFILE_UPDATE_STATUS.fail,
//     };
// };
//
// // sending request to the backend
// //
// export const profileUpdate = (userId, firstName, lastName, address, phone) => {
//     return (dispatch) => {
//         dispatch(profileUpdateStart);
//         axios(API_PATH_USER_DETAIL + userId + API_PATH_USER_UPDATE_ACCOUNT, {
//             // original data before update
//             data: {
//                 firstName: firstName,
//                 lastName: lastName,
//                 address: address,
//                 zip: address.split(","),
//                 phone: phone,
//             },
//             method: "put",
//         })
//             .then((response) => {
//                 console.log(response);
//                 const { successMsg } = response.data;
//                 dispatch(profileUpdateSuccess(userId, firstName, lastName, address, phone));
//                 dispatch(setMessage(MESSAGE_TYPE.info, successMsg));
//             })
//             .catch((error) => {
//                 dispatch(profileUpdateFail());
//             });
//     };
// };