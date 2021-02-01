import React from "react";
import { connect } from "react-redux";
import NavBar from "../../components/Navigation/NavBar/NavBar";

import classes from "./Layout.module.css";
import Footer from "../../components/Footer/Footer";
import * as actions from "../../store/actions";
import SnackbarMessage from "../../components/UI/SnackbarMessage/SnackbarMessage";

function Layout(props) {
  const { role, onLogout, message, messageType, onMessageClose } = props;
  return (
    <React.Fragment>
      <div className={classes.container}>
        <div className={classes.content}>
          <NavBar onLogout={onLogout} role={role} />
          <main className={classes.Main}>{props.children}</main>
          {message !== null ? (
            <SnackbarMessage
              type={messageType}
              message={message}
              onClose={onMessageClose}
            />
          ) : null}
        </div>
        <Footer />
      </div>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    role: state.auth.userDetail.role,
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
