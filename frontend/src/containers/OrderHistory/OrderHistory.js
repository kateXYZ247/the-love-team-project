import React, {useEffect} from "react";
import * as actions from "../../store/actions";
import {connect} from "react-redux";
import ProgressCircle from "../../components/UI/ProgressCircle/ProgressCircle";
import {
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    makeStyles,
    withStyles,
} from "@material-ui/core";
import OrderHistoryTableRow from "../../components/Order/OrderHistoryTableRow/OrderHistoryTableRow";
import {FETCH_ORDERS_TYPE} from "../../constant/order";
import {PATH_HISTORY} from "../../constant/path";

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

function OrderHistory(props) {
    const {
        userId,
        loading,
        onFetchOrders,
        orders,
        onUmount,
        onSetRedirectPath,
    } = props;
    
    const classes = useStyles();

    useEffect(() => {
        onFetchOrders(userId);
        return () => onUmount();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        onSetRedirectPath(PATH_HISTORY);
    }, [onSetRedirectPath]);

    return loading ? (
        <ProgressCircle label={"Loading Order History ..."}/>
    ) : (
        <Grid container justify="center">
            <Grid item xs={11}>
                <TableContainer component={Paper}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableTitleCell/>
                                <TableTitleCell>Order Date</TableTitleCell>
                                <TableTitleCell>Service Date</TableTitleCell>
                                <TableTitleCell>Services</TableTitleCell>
                                <TableTitleCell>Status</TableTitleCell>
                                <TableTitleCell align="right">Total Price ($)</TableTitleCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orders.map((order, index) => (
                                <OrderHistoryTableRow key={index} order={order}/>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    );
}

const mapStateToProps = (state) => {
    return {
        userId: state.auth.userId,
        loading: state.order.loading,
        orders: state.order.orderHistory,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSetRedirectPath: (path) => dispatch(actions.setRedirectPath(path)),
        onFetchOrders: (userId) =>
            dispatch(actions.fetchOrders(FETCH_ORDERS_TYPE.historicalOrders, userId)),
        onUmount: () =>
            dispatch(actions.clearFetchedOrders(FETCH_ORDERS_TYPE.historicalOrders)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderHistory);
