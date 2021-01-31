import axios from 'axios';
import {registerConstants} from "./actionTypes";
// import axios from "../../shared/axios_instance";
import {API_PATH_USER_REGISTER} from "../../constant/api";



export const registerSuccess = () => {
    return {
        type: registerConstants.REGISTER_SUCCESS,
    };
};

export const registerFail = (error) => {
    return {
        type: registerConstants.REGISTER_FAILURE,
        error: error,
    };
};

export const registerStart = () => {
    return {
        type: registerConstants.REGISTER_REQUEST,
    };
};
export const register =(user) => {
    return (dispatch) => {
        dispatch(registerStart());
        console.log("send request")

        const data = {
            firstName: user.firstName,
            lastName: user.lastName,
            phone: user.phone,
            email: user.email,
            password: user.password,
        };
        axios
            // .post(API_PATH_USER_REGISTER, data)
            .post("http://localhost:8080/users/register", data)
            .then((response) => {

                    if (response.status !== 200) {

                        throw new Error("Register failed");
                    }

                    dispatch(registerSuccess());
                },

            )
            .catch((error) => {
                console.log(error.response.data);
            dispatch(registerFail(error));
        });
    };


}