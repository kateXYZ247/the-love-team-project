import React from "react";
import { createMuiTheme, darken, ThemeProvider } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { orange } from "@material-ui/core/colors";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: darken("#D0BDF4", 0.2),
      contrastText: "white",
    },
    secondary: {
      main: orange[500],
    },
  },
  typography: {
    button: {
      textTransform: "none",
      fontWeight: "600",
      color: darken("#D0BDF4", 0.8),
    },
  },
});

function DialogButton(props) {
  return (
    <ThemeProvider theme={theme}>
      <Button {...props}>{props.children}</Button>
    </ThemeProvider>
  );
}

export default DialogButton;
