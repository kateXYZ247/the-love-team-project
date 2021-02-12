import React from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { orange } from "@material-ui/core/colors";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#A0D2E8",
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
    },
  },
});

function ColorButton(props) {
  return (
    <ThemeProvider theme={theme}>
      <Button {...props}>{props.children}</Button>
    </ThemeProvider>
  );
}

export default ColorButton;
