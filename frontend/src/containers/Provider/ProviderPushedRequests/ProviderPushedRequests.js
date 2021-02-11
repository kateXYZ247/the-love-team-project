import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import RequestCard from "../../../components/RequestCard/RequestCard";
import * as actions from "../../../store/actions";
import { connect } from "react-redux";
import { AUTH_ROLE } from "../../../constant/auth";
import {
  SERVICE_STATUS,
  SERVICE_UPDATE_SOURCE,
} from "../../../constant/service";

function ProviderPushedRequests(props) {
  const {
    providerId,
    role,
    pushedRequests,
    onClearPushedRequest,
    onAcceptRequest,
    onDeclineRequest,
  } = props;

  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(role === AUTH_ROLE.provider && pushedRequests.length > 0);
  }, [role, pushedRequests]);

  const dialogClosedHandler = () => {
    onClearPushedRequest();
  };

  return (
    <Dialog onClose={dialogClosedHandler} open={open}>
      <DialogTitle
        style={{ textAlign: "center" }}
        onClose={dialogClosedHandler}
      >
        New Requests
      </DialogTitle>
      <DialogContent dividers>
        {pushedRequests.map((request, index) => (
          <RequestCard
            key={index}
            request={request}
            onAccept={() =>
              onAcceptRequest(index, request.serviceId, providerId)
            }
            onDecline={() => onDeclineRequest(index)}
          />
        ))}
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={dialogClosedHandler} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

const mapStateToProps = (state) => {
  return {
    providerId: state.auth.userId,
    role: state.auth.userDetail.role,
    pushedRequests: state.provider.pushedRequests,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onClearPushedRequest: () => dispatch(actions.clearPushedRequest()),
    onDeclineRequest: (index) =>
      dispatch(
        actions.declineRequest(index, SERVICE_UPDATE_SOURCE.pushedRequests)
      ),
    onAcceptRequest: (serviceIndex, serviceId, providerId) =>
      dispatch(
        actions.updateServiceStatus(
          serviceIndex,
          serviceId,
          providerId,
          SERVICE_STATUS.accepted,
          SERVICE_UPDATE_SOURCE.pushedRequests
        )
      ),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProviderPushedRequests);
