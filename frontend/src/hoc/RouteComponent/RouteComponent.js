import React, { useEffect } from "react";
import * as actions from "../../store/actions";
import { connect } from "react-redux";

function RouteComponent(props) {
  const { role, path, onSetPath } = props;

  useEffect(() => {
    onSetPath(role, path);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [role, path]);

  return <React.Fragment>{props.children}</React.Fragment>;
}

const mapStateToProps = (state) => {
  return {
    role: state.auth.userDetail.role,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSetPath: (role, path) => dispatch(actions.setPath(role, path)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RouteComponent);
