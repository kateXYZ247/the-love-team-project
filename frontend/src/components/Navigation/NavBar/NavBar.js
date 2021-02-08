import React from "react";
import { Divider, Hidden, withStyles } from "@material-ui/core";

import NavigationItems from "../NavigationItems/NavigationItems";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { PATH_HOME, PATH_LOGIN } from "../../../constant/path";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

const TitleTypography = withStyles({
  root: {
    fontFamily: "serif",
    textAlign: "center",
    color: "inherit",
    textDecoration: "inherit",
    marginTop: 50,
    marginBottom: 20,
  },
})(Typography);

function NavBar(props) {
  const { onLogout, role, isAuthenticated } = props;

  return (
    <React.Fragment>
      <Grid container justify="center">
        <Grid item xs={12} container justify="center">
          <TitleTypography component={Link} to={PATH_HOME} variant="h3">
            THE LOVE TEAM
          </TitleTypography>
        </Grid>
        <Grid item xs={2} />
        <Grid item xs={8} container justify="center">
          <Hidden xsDown>
            <NavigationItems
              role={role}
              onLogout={onLogout}
              isAuthenticated={isAuthenticated}
            />
          </Hidden>
        </Grid>
        <Grid item xs={2} container justify="center" alignContent="center">
          {!isAuthenticated ? (
            <Button component={Link} to={PATH_LOGIN}>
              Login
            </Button>
          ) : (
            <Button onClick={onLogout}>Logout</Button>
          )}
        </Grid>
        <Grid item xs={10} xl={8}>
          <Divider variant="fullWidth" />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default NavBar;
