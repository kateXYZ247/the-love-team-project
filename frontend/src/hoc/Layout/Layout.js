import React, { useState } from "react";
import { connect } from "react-redux";
import NavBar from "../../components/Navigation/NavBar/NavBar";

import classes from "./Layout.module.css";
import Footer from "../../components/Footer/Footer";
import * as actions from "../../store/actions";
import SnackbarMessage from "../../components/UI/SnackbarMessage/SnackbarMessage";
import { AUTH_ROLE } from "../../constant/auth";
import ProviderPushedRequests from "../../containers/Provider/ProviderPushedRequests/ProviderPushedRequests";
import { PATH_HOME } from "../../constant/path";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

function Layout(props) {
  const {
    isAuthenticated,
    role,
    firstName,
    currentPath,
    onLogout,
    onSetPath,
    onDisconnectWebSocket,
    onClearCart,
    stompClient,
    message,
    messageType,
    onMessageClose,
  } = props;

  const [openSideDrawer, setOpenSideDrawer] = useState(false);

  const drawerToggledHandler = () => {
    setOpenSideDrawer(!openSideDrawer);
  };

  const LogoutClickedHandler = () => {
    onLogout();
    onSetPath(role, PATH_HOME);
    if (role === AUTH_ROLE.provider) {
      onDisconnectWebSocket(stompClient);
    } else if (role === AUTH_ROLE.user) {
      onClearCart();
    }
  };

  return (
    <React.Fragment>
      <div className={classes.container}>
        <div className={classes.content}>
          <NavBar
            onLogout={LogoutClickedHandler}
            role={role}
            firstName={firstName}
            isAuthenticated={isAuthenticated}
            currentPath={currentPath}
            onDrawOpen={drawerToggledHandler}
          />
          <SideDrawer
            open={openSideDrawer}
            onClose={drawerToggledHandler}
            isAuthenticated={isAuthenticated}
            currentPath={currentPath}
            role={role}
          />
          <main className={classes.Main}>{props.children}</main>
          {message !== null ? (
            <SnackbarMessage
              type={messageType}
              message={message}
              onClose={onMessageClose}
            />
          ) : null}
          <ProviderPushedRequests />
        </div>
        <Footer />
      </div>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
    role: state.auth.userDetail.role,
    firstName: state.auth.userDetail.firstName,
    stompClient: state.auth.stompClient,
    message: state.message.message,
    messageType: state.message.messageType,
    pushedRequests: state.provider.pushedRequests,
    currentPath: state.route.path,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => dispatch(actions.logoutAndMessage()),
    onClearCart: () => dispatch(actions.clearCart()),
    onDisconnectWebSocket: (stompClient) =>
      dispatch(actions.disconnectWebSocket(stompClient)),
    onMessageClose: () => dispatch(actions.clearMessage()),
    onClearPushedRequest: () => dispatch(actions.clearPushedRequest()),
    onSetPath: (role, path) => dispatch(actions.setPath(role, path)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
