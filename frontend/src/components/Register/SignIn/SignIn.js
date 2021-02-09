import React from "react";
import Link from "@material-ui/core/Link";
import { Typography } from "@material-ui/core";
import { PATH_LOGIN } from "../../../constant/path";

function SignIn(props) {
  return (
    <div>
      <Typography align="center">
        Already a member ?{" "}
        <Link href={PATH_LOGIN} color="primary">
          Sign in
        </Link>
      </Typography>
    </div>
  );
}

export default SignIn;
