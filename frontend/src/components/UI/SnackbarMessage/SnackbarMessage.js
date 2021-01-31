import React from "react";
import MuiAlert from "@material-ui/lab/Alert";
import { Snackbar } from "@material-ui/core";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function SnackbarMessage(props) {
  const { level, message, onClose } = props;
  return (
    <Snackbar open autoHideDuration={3000} onClose={onClose}>
      <Alert onClose={onClose} severity={level}>
        {message}
      </Alert>
    </Snackbar>
  );
}

export default SnackbarMessage;
