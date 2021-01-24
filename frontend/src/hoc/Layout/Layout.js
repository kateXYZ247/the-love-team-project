import React from "react";
import { connect } from "react-redux";
import NavBar from "../../components/Navigation/NavBar/NavBar";

import classes from "./Layout.module.css";
import Footer from "../../components/Footer/Footer";

function Layout(props) {
  return (
    <React.Fragment>
      <NavBar isAuth={props.isAuthenticated} />
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

export default connect(mapStateToProps)(Layout);
