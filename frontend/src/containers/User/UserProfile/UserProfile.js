import React from 'react';
import UserInfo from "../../../components/UserProfile/UserInfo";
import UserProfAvatar from "../../../components/UserProfile/UserProfAvatar";
import { Box, Grid } from "@material-ui/core";
import * as actions from "../../../store/actions";
import { connect } from "react-redux";

function UserProfile(props) {
    const {
        userId,
        firstName,
        lastName,
        address,
        phone,
        profileUpdate,
    } = props;

    function handleUpdate(firstName, lastName, address, phone) {
        profileUpdate(userId, firstName, lastName, address, phone);
    }

    return(
        <React.Fragment>
            <Grid container justify="center">
                <Box display="flex" mt={3} align="flex-start">
                    <UserProfAvatar/>
                </Box>

                <Box mt={3}>
                    <UserInfo
                        firstName = {firstName}
                        lastName={lastName}
                        address={address}
                        phone={phone}
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


