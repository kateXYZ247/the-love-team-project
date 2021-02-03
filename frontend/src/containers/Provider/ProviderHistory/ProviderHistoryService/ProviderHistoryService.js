import React, { useEffect, useState } from "react";
import * as actions from "../../../../store/actions";
import { connect } from "react-redux";
import {
  Box,
  Button,
  Grid,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  withStyles,
} from "@material-ui/core";
import ProviderHistoryForm from "../../../../components/ProviderHistoryForm/ProviderHistoryForm";
import BackdropProgressCircle from "../../../../components/UI/BackdropProgressCircle/BackdropProgressCircle";

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

// const TableTitleCell = withStyles((theme) => ({
//   head: {
//     backgroundColor: theme.palette.primary.light,
//     fontSize: 20,
//     color: "white",
//     fontWeight: "bold",
//   },
//   body: {},
// }))(TableCell);

function ProviderHistoryService(props) {
  const { userId, loading, requests, onFetchRequests } = props;
  const classes = useStyles();
  // const [deleted, setDeleted] = useState(requests.map(() => false));

  useEffect(() => {
    onFetchRequests(userId);
  }, [userId, onFetchRequests]);

  // useEffect(() => setDeleted(requests.map(() => false)), [requests]);

  const TableTitleCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.primary.light,
      fontSize: 20,
      color: "white",
      fontWeight: "bold",
    },
    body: {},
  }))(TableCell);

  return (
    <React.Fragment>
      <BackdropProgressCircle open={loading} />
      <Box mb={2}>
        <Typography variant="h5" align="center" color="primary">
          Historical Services
        </Typography>
      </Box>
      <Grid container justify="center">
        <Grid item xs={11}>
          <TableContainer component={Paper}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableTitleCell align="center">Date</TableTitleCell>
                  <TableTitleCell align="center">Booking ID</TableTitleCell>
                  <TableTitleCell align="center">Location</TableTitleCell>
                  <TableTitleCell align="center">Service</TableTitleCell>
                  <TableTitleCell align="center">Status</TableTitleCell>
                  <TableTitleCell align="center">Earning</TableTitleCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {requests.map((request) => (
                  <ProviderHistoryForm request={request} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>

      <Box p={5} height="30px" display="flex" justifyContent="flex-end">
        <Button
          variant="contained"
          color="secondary"
          // onClick={handleClick}
          size="large"
        >
          Request Payment
        </Button>
        {/*<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>*/}
        {/*  This is a success message!*/}
        {/*</Snackbar>*/}
      </Box>
    </React.Fragment>
  );
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProviderHistoryService);
