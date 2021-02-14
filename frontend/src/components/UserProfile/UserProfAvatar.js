import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import userAvatar from "../../assets/images/user_avatar.svg";
import { Box, Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(3),
        },
        verticalAlign: 'center',
    },
    large: {
        width: theme.spacing(23),
        height: theme.spacing(23),
        margin: 'auto',
        padding: 15,
    },
}));

function UserProfAvatar() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Avatar alt="Doggy Pooh" src={userAvatar} className={classes.large} />
        </div>
    );
}

export default UserProfAvatar;