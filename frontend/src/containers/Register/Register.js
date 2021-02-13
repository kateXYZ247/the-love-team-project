import React, { useState } from "react";
import { Box, Grid } from "@material-ui/core";
import SignIn from "../../components/Register/SignIn/SignIn";
import RegisterForm from "../../components/Register/RegisterForm/RegisterForm";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import BackdropProgressCircle from "../../components/UI/BackdropProgressCircle/BackdropProgressCircle";
import * as actions from "../../store/actions";
import {checkValidity} from "../../shared/utility";


function Register(props) {
  const { loading, flag, onRegister, onResetForm } = props;
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    confirmPW: "",
    isAgree: false,
  });

  const [submitted, setSubmit] = useState(false);
  const [validEmail, setValidEmail] = useState("initial");
  const [validFName, setValidFName] = useState("initial");
  const [validLName, setValidLName] = useState("initial");
  const [validPhone, setValidPhone] = useState("initial");
  const [validPW, setValidPW] = useState("initial");
  const [confirmPW, setConfirmPW] = useState("initial");

  function handleConfirm(e) {
    const value = e.target.value;
    if (!value) {
      setConfirmPW("null");
    } else if (value !== user.password) {
      setConfirmPW("invalid");
    } else {
      setConfirmPW("");
    }
  }

  function validateEmail(e) {
    const value = e.target.value;
      setValidEmail(checkValidity("email", value));
  }
  function validateFName(e) {
    const value = e.target.value;
    setValidFName(checkValidity("name", value));
  }
  function validateLName(e) {
    const value = e.target.value;
    setValidLName(checkValidity("name", value));
  }
  function validatePhone(e) {
    const value = e.target.value;
    setValidPhone(checkValidity("phone", value));
  }
  function validatePW(e) {
    const value = e.target.value;
    setValidPW(checkValidity("password", value));
  }
  // const history = useHistory();
  function handleChange(e) {
    const { name, value } = e.target;
    setUser((user) => ({ ...user, [name]: value }));
    setSubmit(false);
  }

  function checkedBoxHandleChange(e) {
    const name = e.target.name;
    const value = e.target.checked;
    setUser((user) => ({ ...user, [name]: value }));
    setSubmit(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmit(true);
    if (
      !validEmail &&
      !validFName &&
      !validLName &&
      !validPhone &&
      !validPW &&
      !confirmPW &&
       user.isAgree
    ) {
      onRegister(user);
    } else {
      setValidFName(checkValidity("name", user.firstName));
      setValidLName(checkValidity("name", user.lastName));
      setValidPhone(checkValidity("phone",user.phone));
      setValidEmail(checkValidity("email", user.email));
      setValidPW(checkValidity("password", user.password));
      if (!user.confirmPW) {
        setConfirmPW("null");
      } else if (user.confirmPW !== user.password) {
        setConfirmPW("invalid");
      }
    }
  }

  return flag ? (
    <Redirect to={"/login"} />
  ) : (
    <React.Fragment>
      <BackdropProgressCircle open={loading} />
      <Grid container justify="center">
        <Box component="span" mt={1}>
          <SignIn />
        </Box>
        <Box mt={3}>
          <RegisterForm
            user={user}
            handleChange={handleChange}
            checkedBoxHandleChange={checkedBoxHandleChange}
            handleSubmit={handleSubmit}
            submitted={submitted}
            onUnmount={onResetForm}
            validEmail={validEmail}
            checkEmail={validateEmail}
            validFName={validFName}
            checkFName={validateFName}
            validLName={validLName}
            checkLName={validateLName}
            validPhone={validPhone}
            checkPhone={validatePhone}
            validPW={validPW}
            checkPW={validatePW}
            confirmPW={confirmPW}
            checkConfirmPW={handleConfirm}
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
    onRegister: (user) => dispatch(actions.register(user)),
    onResetForm: () => dispatch(actions.registerReset()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Register);
