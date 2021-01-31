import React, { useState} from "react";
import { Box, Grid } from "@material-ui/core";
import SignIn from "../../components/Register/SignIn/SignIn";
import RegisterForm from "../../components/Register/RegisterForm/RegisterForm";
import {connect} from 'react-redux';
import {Redirect} from "react-router-dom";
import BackdropProgressCircle from "../../components/UI/BackdropProgressCircle/BackdropProgressCircle";
import * as actions from "../../store/actions";

function Register(props) {
    const{loading, error, flag, onRegister} = props;
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        password: ''
    });
    const [submitted, setSubmit] = useState(false);
    // const history = useHistory();
    function handleChange(e) {
        const { name, value } = e.target;
        setUser(user => ({ ...user, [name]: value }));
        setSubmit(false);
    }
    function handleSubmit(e) {
        e.preventDefault();
        setSubmit(true);
        if (user.firstName && user.lastName && user.phone && user.email && user.password) {
           onRegister(user);
        }
    }
    // function handleEmailErr(error) {
    //     if (error) {
    //         console.log(error);
    //         const [errorMessage, successMessage] = error.response.data;
    //         console.log(errorMessage);
    //         return errorMessage[0].contains("Email");
    //     } else {
    //         return false;
    //     }
    // }
    return flag ? <Redirect to={'/login'} /> :(
        <React.Fragment>
            <BackdropProgressCircle open={loading} />
            <Grid container justify="center">
            <Box component="span" mt={1} >
               <SignIn />
            </Box>
            <Box mt={3}>
                <RegisterForm
                    user={user}
                    // checkEmail={handleEmailErr(error)}
                    // checkPhone={handlePhoneErr(error)}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    submitted={submitted}
                />
            </Box>
            </Grid>
        </React.Fragment>
    );
}
const mapStateToProps = (state) => {
    return {
        error: state.register.error,
        loading: state.register.loading,
        flag: state.register.flag,
        submitted: state.register.submitted,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        onRegister: (user) =>
            dispatch(actions.register(user)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Register);