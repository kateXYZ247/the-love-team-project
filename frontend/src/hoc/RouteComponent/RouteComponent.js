import React, { useEffect } from "react";
import * as actions from "../../store/actions";
import { connect } from "react-redux";

function RouteComponent(props) {
  const { path, onSetPath } = props;

  useEffect(() => {
    onSetPath(path);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path]);

  return <React.Fragment>{props.children}</React.Fragment>;
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSetPath: (path) => dispatch(actions.setPath(path)),
  };
};

export default connect(null, mapDispatchToProps)(RouteComponent);
