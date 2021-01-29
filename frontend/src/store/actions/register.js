import { alertActions } from './alert';
import {registerConstants} from '../../constant/registerConstant';
import {useHistory} from "react-router-dom";

function service(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };
    console.log(requestOptions);
    return fetch(`/register`, requestOptions);
}
export const register =(user) => {
    return dispatch => {
        dispatch(request(user));
        console.log("send request")
        service(user)
            .then(
                user => {
                    dispatch(success());
                    // const history = useHistory();
                    // history.push('/login');
                    console.log("success");
                    dispatch(alertActions.success('Registration successful'));
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