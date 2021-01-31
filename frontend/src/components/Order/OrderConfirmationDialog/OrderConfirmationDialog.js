import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";

function OrderConfirmationDialog(props) {
  const { price, open, onConfirm, onClose } = props;
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{"Are you ready to place order?"}</DialogTitle>
      <DialogContent>
        <DialogContentText>Total price: ${price.toFixed(2)}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onConfirm} color="primary" autoFocus>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default OrderConfirmationDialog;
