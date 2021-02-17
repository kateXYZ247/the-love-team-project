import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import userAvatar from "../../assets/images/userAvatar.svg";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(3),
    },
    verticalAlign: "center",
  },
  large: {
    width: theme.spacing(15),
    height: theme.spacing(15),
    margin: "auto",
    padding: 15,
  },
}));

function UserProfAvatar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Avatar alt="Person" src={userAvatar} className={classes.large} />
    </div>
  );
}

export default UserProfAvatar;
