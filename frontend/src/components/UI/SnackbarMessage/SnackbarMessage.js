import React from "react";
import MuiAlert from "@material-ui/lab/Alert";
import { Snackbar } from "@material-ui/core";
import { MESSAGE_DURATION } from "../../../constant/constant";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function SnackbarMessage(props) {
  const { type, message, onClose } = props;
  return (
    <Snackbar
      open
      autoHideDuration={MESSAGE_DURATION}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert onClose={onClose} severity={type}>
        {message}
      </Alert>
    </Snackbar>
  );
}

export default SnackbarMessage;
