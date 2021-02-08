import React, { useState } from "react";
import { Divider, Hidden, Menu, MenuItem, withStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import FaceIcon from "@material-ui/icons/Face";
import { Link } from "react-router-dom";

import { PATH_HOME, PATH_LOGIN } from "../../../constant/path";
import NavigationItems from "../NavigationItems/NavigationItems";
import { USER_MENU_ITEMS } from "../../../constant/auth";

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
  const { onLogout, role, firstName, isAuthenticated, currentPath } = props;

  const [anchorElement, setAnchorElement] = useState(null);

  const menuClosedHandler = () => {
    setAnchorElement(null);
  };

  const menuClickedHandler = (event) => {
    setAnchorElement(event.currentTarget);
  };

  const menuItemClickedHandler = (selectItem) => {
    if (selectItem === USER_MENU_ITEMS.logout) {
      onLogout();
    }
    setAnchorElement(null);
  };

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
              isAuthenticated={isAuthenticated}
              currentPath={currentPath}
            />
          </Hidden>
        </Grid>
        <Grid item xs={2} container justify="center" alignContent="center">
          {!isAuthenticated ? (
            <Button startIcon={<FaceIcon />} component={Link} to={PATH_LOGIN}>
              Login
            </Button>
          ) : (
            <React.Fragment>
              <Button startIcon={<FaceIcon />} onClick={menuClickedHandler}>
                {firstName}
              </Button>
              <Menu
                id="simple-menu"
                anchorEl={anchorElement}
                getContentAnchorEl={null}
                keepMounted
                open={Boolean(anchorElement)}
                onClose={menuClosedHandler}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
              >
                {Object.entries(USER_MENU_ITEMS).map((item) => (
                  <MenuItem
                    key={item[1]}
                    onClick={() => menuItemClickedHandler(item[1])}
                  >
                    {item[1]}
                  </MenuItem>
                ))}
              </Menu>
            </React.Fragment>
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
