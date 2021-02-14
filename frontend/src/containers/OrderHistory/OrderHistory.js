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
import {PATH_HISTORY} from '../../constant/path'

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

function DateComparator(order1, order2) {

    var DateA = new Date(order1.createdAt);
    var DateB = new Date(order2.createdAt);
    if (DateA < DateB) {
        return 1;
    } else if (DateA > DateB) {
        return -1;
    } else {
        return 0;
    }
}


function OrderHistory(props) {
    const {userId, loading, onFetchOrders, orders, onUmount, onSetRedirectPath} = props;

    orders.sort(DateComparator);
   

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
                            {orders.map((order, index) => {
                                return (
                                    <React.Fragment key={index}>
                                        <OrderHistoryTableRow key={order.orderId} order={order}/>
                                    </React.Fragment>
                                );
                            })}
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
