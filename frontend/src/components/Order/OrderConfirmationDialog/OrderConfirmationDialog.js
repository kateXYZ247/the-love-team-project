import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import DialogButton from "../../UI/Buttons/DialogButton";

function OrderConfirmationDialog(props) {
  const { price, open, onConfirm, onClose } = props;
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{"Are you ready to place order?"}</DialogTitle>
      <DialogContent>
        <DialogContentText>Total price: ${price.toFixed(2)}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <DialogButton onClick={onClose} color="secondary">
          Cancel
        </DialogButton>
        <DialogButton onClick={onConfirm} color="primary" autoFocus>
          Yes
        </DialogButton>
      </DialogActions>
    </Dialog>
  );
}

export default OrderConfirmationDialog;
