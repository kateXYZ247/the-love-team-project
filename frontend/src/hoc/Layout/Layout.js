import React from "react";
import { connect } from "react-redux";
import NavBar from "../../components/Navigation/NavBar/NavBar";

import classes from "./Layout.module.css";
import Footer from "../../components/Footer/Footer";
import * as actions from "../../store/actions";
import SnackbarMessage from "../../components/UI/SnackbarMessage/SnackbarMessage";

function Layout(props) {
  const {
    isAuthenticated,
    onLogout,
    message,
    messageType,
    onMessageClose,
  } = props;
  return (
    <React.Fragment>
      <NavBar isAuthenticated={isAuthenticated} onLogout={onLogout} />
      <main className={classes.Main}>{props.children}</main>
      {message !== null ? (
        <SnackbarMessage
          type={messageType}
          message={message}
          onClose={onMessageClose}
        />
      ) : null}
      <Footer />
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
    message: state.message.message,
    messageType: state.message.messageType,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => dispatch(actions.logoutAndCleanCart()),
    onMessageClose: () => dispatch(actions.clearMessage()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
