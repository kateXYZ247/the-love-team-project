import React, { useEffect } from "react";
import * as actions from "../../../../store/actions";
import { connect } from "react-redux";

function RequestedServices(props) {
  const { userId, loading, requests, onFetchRequests } = props;

  useEffect(() => {
    onFetchRequests(userId);
  }, [userId, onFetchRequests]);

  return <div></div>;
}

const mapStateToProps = (state) => {
  return {
    userId: state.auth.userId,
    loading: state.provider.loading,
    requests: state.provider.requests,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchRequests: (userId) => dispatch(actions.fetchRequests(userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RequestedServices);
