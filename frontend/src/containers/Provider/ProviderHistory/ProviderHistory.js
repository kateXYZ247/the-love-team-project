import React, { useEffect } from "react";
import * as actions from "../../../store/actions";
import { connect } from "react-redux";
import {
  Box,
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
import Snackbar from "@material-ui/core/Snackbar";
import ProviderHistoryForm from "../../../components/ProviderHistoryForm/ProviderHistoryForm";
import BackdropProgressCircle from "../../../components/UI/BackdropProgressCircle/BackdropProgressCircle";
import { PROVIDER_FETCH_SERVICES_TYPE } from "../../../constant/provider";
import MuiAlert from "@material-ui/lab/Alert";
import ColorButton from "../../../components/UI/Buttons/ColorButton";

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

const TableTitleCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.secondary.light,
    color: theme.palette.primary.contrastText,
    fontSize: 20,
  },
  body: {},
}))(TableCell);

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function ProviderHistory(props) {
  const { userId, loading, services, onFetchHistoryServices, onUmount } = props;

  const classes = useStyles();

  useEffect(() => {
    onFetchHistoryServices(userId);
    return () => onUmount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <React.Fragment>
      <BackdropProgressCircle open={loading} />
      <Box mb={2}>
        <Typography variant="h5" align="center" color="secondary">
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
                  <TableTitleCell align="center">Service ID</TableTitleCell>
                  <TableTitleCell align="center">Location</TableTitleCell>
                  <TableTitleCell align="center">Service</TableTitleCell>
                  <TableTitleCell align="center">Status</TableTitleCell>
                  <TableTitleCell align="center">Earning ($)</TableTitleCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {services.map((service, index) => (
                  <ProviderHistoryForm service={service} key={index} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
      <Box p={5} height="30px" display="flex" justifyContent="flex-end">
        <ColorButton
          variant="contained"
          color="primary"
          onClick={handleClick}
          size="large"
        >
          Request Payment
        </ColorButton>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success">
            Request Sent!
          </Alert>
        </Snackbar>
      </Box>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    userId: state.auth.userId,
    loading: state.provider.loading,
    services: state.provider.histories,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchHistoryServices: (userId) =>
      dispatch(
        actions.fetchServices(
          PROVIDER_FETCH_SERVICES_TYPE.historicalServices,
          userId
        )
      ),
    onUmount: () =>
      dispatch(
        actions.clearFetchedServices(
          PROVIDER_FETCH_SERVICES_TYPE.historicalServices
        )
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProviderHistory);
