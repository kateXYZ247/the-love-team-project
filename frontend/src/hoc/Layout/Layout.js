import React from "react";
import { connect } from "react-redux";
import NavBar from "../../components/Navigation/NavBar/NavBar";

import classes from "./Layout.module.css";
import Footer from "../../components/Footer/Footer";
import * as actions from "../../store/actions";

function Layout(props) {
  const { isAuthenticated, onLogout } = props;
  return (
    <React.Fragment>
      <NavBar isAuthenticated={isAuthenticated} onLogout={onLogout} />
      <main className={classes.Main}>{props.children}</main>
      <Footer />
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => dispatch(actions.logoutAndCleanCart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
