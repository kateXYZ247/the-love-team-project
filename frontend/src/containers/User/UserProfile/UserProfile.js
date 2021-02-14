import React, { useState } from 'react';
import UserInfo from "../../../components/UserProfile/UserInfo";
import UserProfAvatar from "../../../components/UserProfile/UserProfAvatar";
import { Box, Grid } from "@material-ui/core";
import * as actions from "../../../store/actions";
import { connect } from "react-redux";

function UserProfile(props) {
    // receive states from Reducer
    const {
        userId,
        firstName,
        lastName,
        address,
        phone,
        profileUpdate,
    } = props;

    // userInfo -> useState -> UserProfile state
    const[user, setUser] = useState({
        firstName: firstName,
        lastName: lastName,
        address: address,
        phone: phone,
    });

    // display the change on UI
    function handleChange(e) {
        const { name, value } = e.target;
        setUser((user) => ({ ...user, [name]: value }));
    }

    function handleUpdate(e) {
        e.preventDefault();
        // if (user.firstName &&
        //     user.lastName &&
        //     user.address &&
        //     user.phone) {
            profileUpdate(userId, user.firstName, user.lastName, user.address, user.phone);
        // }
    }

    return(
        <React.Fragment>
            <Grid container justify="center">
                <Box display="flex" mt={3} align="flex-start">
                    <UserProfAvatar/>
                </Box>

                <Box mt={3}>
                    <UserInfo
                        user={user}
                        handleChange={handleChange}
                        handleUpdate={handleUpdate}
                    />
                </Box>
            </Grid>
        </React.Fragment>
    );
}

const mapStateToProps = (state) => {
    return {
        firstName: state.auth.userDetail.firstName,
        lastName: state.auth.userDetail.lastName,
        phone: state.auth.userDetail.phone,
        address: state.auth.userDetail.address,
        userId: state.auth.userId
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        profileUpdate: (userId, firstName, lastName, address, phone) =>
            dispatch(actions.profileUpdate(userId, firstName, lastName, address, phone)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);


