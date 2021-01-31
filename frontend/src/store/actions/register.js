import { alertActions } from './alert';
import {Redirect, useHistory} from "react-router-dom";
import axios from "axios";
import React from "react";
import {registerConstants} from "./actionTypes";

function service(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };
    console.log(requestOptions);
    return fetch('http://localhost:8080/users/register', requestOptions).then(handleResponse);
}
function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}
export const register =(user) => {
    return dispatch => {
        dispatch(request(user));
        console.log("send request")
        // service(user)
        axios({
            method: 'post',
            url: 'http://localhost:8080/users/register',
            data: JSON.stringify(user),
            headers: {'Content-Type': 'application/json' }
        })
            .then((response) => {
                    dispatch(success());
                    // const history = useHistory();
                    // history.push('/login');
                    console.log("response");
                    dispatch(alertActions.success('Registration successful'));
                    // <Redirect to="/login"/>
                    console.log("success2");
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: registerConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: registerConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: registerConstants.REGISTER_FAILURE, error } }
}