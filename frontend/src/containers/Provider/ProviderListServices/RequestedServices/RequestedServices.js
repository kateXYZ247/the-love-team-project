import React, { useEffect } from "react";
import * as actions from "../../../../store/actions";
import { connect } from "react-redux";
import {
  Grid,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  withStyles,
} from "@material-ui/core";
import ProviderListServicesTableRow from "../../../../components/ProviderListServicesTableRow/ProviderListServicesTableRow";
import BackdropProgressCircle from "../../../../components/UI/BackdropProgressCircle/BackdropProgressCircle";

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

const TableTitleCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.contrastText,
    fontSize: 20,
  },
  body: {},
}))(TableCell);

function RequestedServices(props) {
  const { userId, loading, requests, onFetchRequests } = props;
  const classes = useStyles();

  useEffect(() => {
    onFetchRequests(userId);
  }, [userId, onFetchRequests]);

  return (
    <React.Fragment>
      <BackdropProgressCircle open={loading} />
      <Grid container justify="center">
        <Grid item xs={11}>
          <TableContainer component={Paper}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableTitleCell>Date</TableTitleCell>
                  <TableTitleCell>Location</TableTitleCell>
                  <TableTitleCell>Service</TableTitleCell>
                  {/*<TableTitleCell>Pets</TableTitleCell>*/}
                  <TableTitleCell>Note</TableTitleCell>
                  <TableTitleCell align="center">Actions</TableTitleCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {requests.map((request) => (
                  <ProviderListServicesTableRow
                    key={request.serviceId}
                    request={request}
                  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
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

export default connect(mapStateToProps, mapDispatchToProps)(RequestedServices);
