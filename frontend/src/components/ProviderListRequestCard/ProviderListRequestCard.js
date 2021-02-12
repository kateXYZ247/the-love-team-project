import React from "react";
import Grid from "@material-ui/core/Grid";
import RequestCard from "../RequestCard/RequestCard";
import { Fade } from "@material-ui/core";

function ProviderListRequestCard(props) {
  const { request, onAccept, onDecline, onDelete } = props;
  return (
    <Fade in={!onDelete}>
      <Grid item xs={12} md={8} lg={6} xl={4} container justify="center">
        <RequestCard
          request={request}
          onAccept={onAccept}
          onDecline={onDecline}
        />
      </Grid>
    </Fade>
  );
}

export default ProviderListRequestCard;
