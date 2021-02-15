import * as actionTypes from "./actionTypes";
import axios from "../../shared/axios_instance";
import {
    API_PATH_USER_PLACE_ORDER,
    HTTP_STATUS_OK,
    API_PATH_FETCH_USER_ORDER,
    API_PATH_FETCH_USER_UPCOMING_ORDER,
    API_PATH_USER_UPDATE_ORDER,
} from "../../constant/api";
import {updateObject} from "../../shared/utility";
import {setMessage} from "./message";
import {MESSAGE_TYPE} from "../../constant/message";
import {FETCH_ORDERS_TYPE} from "../../constant/order";

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

export const addToCart = (product) => {
    return {
        type: actionTypes.ORDER_ADD_TO_CART,
        product: product,
    };
};

export const deleteFromCart = (productIndex) => {
    return {
        type: actionTypes.ORDER_DELETE_FROM_CART,
        deleteIndex: productIndex,
    };
};

export const updateCart = () => {
    return {
        type: actionTypes.ORDER_UPDATE_CART,
    };
};

export const updateServiceTimeAddress = (startTime, address) => {
    return {
        type: actionTypes.ORDER_UPDATE_SERVICE_TIME_ADDRESS,
        startTime: startTime,
        address: address,
    };
};

export const switchToPayment = () => {
    return {
        type: actionTypes.ORDER_SWITCH_TO_PAYMENT,
    };
};

export const updatePaymentInfo = (creditCard) => {
    return {
        type: actionTypes.ORDER_UPDATE_PAYMENT_INFO,
        creditCard: creditCard,
    };
};

export const setBackStatus = () => {
    return {
        type: actionTypes.ORDER_SET_BACK_STATUS,
    };
};

export const resetStatus = () => {
    return {
        type: actionTypes.ORDER_RESET_STATUS,
    };
};

export const clearCart = () => {
    return {
        type: actionTypes.ORDER_CLEAR_CART,
    };
};

export const placeOrderStart = () => {
    return {
        type: actionTypes.ORDER_PLACE_ORDER_START,
    };
};

export const placeOrderSuccess = () => {
    return {
        type: actionTypes.ORDER_PLACE_ORDER_SUCCESS,
    };
};

export const placeOrderFail = () => {
    return {
        type: actionTypes.ORDER_PLACE_ORDER_FAIL,
    };
};

export const placeOrder = (order, userId) => {
    const requestBody = updateObject(order, {
        services: null,
        servs: order.services,
        userId: userId,
    });
    return (dispatch) => {
        dispatch(placeOrderStart());
        axios
            .post(API_PATH_USER_PLACE_ORDER, requestBody)
            .then((response) => {
                if (response.status === HTTP_STATUS_OK) {
                    dispatch(placeOrderSuccess());
                    dispatch(setMessage(MESSAGE_TYPE.success, response.data));
                } else {
                    throw new Error(response.statusText);
                }
            })
            .catch((error) => {
                dispatch(placeOrderFail());
                dispatch(setMessage(MESSAGE_TYPE.error, error.message));
            });
    };
};

export const fetchOrdersSuccess = (type, orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        fetchType: type,
        orders: orders,
    };
};

export const fetchOrdersFail = (type) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        fetchType: type,
    };
};

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START,
    };
};

export const fetchOrders = (type, userId) => {
    return (dispatch) => {
        dispatch(fetchOrdersStart());
        let url = "";
        switch (type) {
            case FETCH_ORDERS_TYPE.upcomingAppointments:
                url = API_PATH_FETCH_USER_UPCOMING_ORDER;
                url += userId + "&status=upcoming";
                break;
            case FETCH_ORDERS_TYPE.historicalOrders:
                url = API_PATH_FETCH_USER_ORDER;
                url += userId;
                break;
            default:
        }
        axios
            .get(url)
            .then((response) => {
                if (
                    response.hasOwnProperty("data") &&
                    response.data.hasOwnProperty("orderHistoryResponseBody")
                ) {
                    const fetchedOrders = response.data.orderHistoryResponseBody;
                    fetchedOrders.sort(DateComparator);
                    dispatch(fetchOrdersSuccess(type, fetchedOrders));
                } else {
                    throw new Error("Invalid data!");
                }
            })
            .catch((error) => {
                console.log("error is ", error);
                if (error.toString().includes("Cannot read property 'hasOwnProperty' of undefined")) {
                    dispatch(setMessage(MESSAGE_TYPE.warning, "TIME OUT! PLEASE LOG IN AGAIN!"));
                } else {
                    dispatch(fetchOrdersFail(type));
                    dispatch(setMessage(MESSAGE_TYPE.warning, error.message));
                }
            });
    };
};

export const clearFetchedOrders = (source) => {
    return {
        type: actionTypes.CLEAR_FETCHED_ORDERS,
        source: source,
    };
};

const userUpdateOrderStatusStart = (index) => {
    return {
        type: actionTypes.USER_UPDATE_ORDER_STATUS.start,
        index: index,
    };
};

const userUpdateOrderStatusSuccess = (index, updatedStatus) => {
    return {
        type: actionTypes.USER_UPDATE_ORDER_STATUS.success,
        index: index,
        updatedStatus: updatedStatus,
    };
};

const userUpdateOrderStatusFail = () => {
    return {
        type: actionTypes.USER_UPDATE_ORDER_STATUS.fail,
    };
};

export const userUpdateOrderStatus = (
    orderIndex,
    orderId,
    userId,
    updatedStatus
) => {
    return (dispatch) => {
        dispatch(userUpdateOrderStatusStart());
        const data = {
            userId: userId,
            status: updatedStatus,
        };
        axios
            .patch(API_PATH_USER_UPDATE_ORDER + orderId, data)
            .then((response) => {
                if (response.status === HTTP_STATUS_OK) {
                    dispatch(userUpdateOrderStatusSuccess(orderIndex, updatedStatus));
                    dispatch(
                        setMessage(MESSAGE_TYPE.success, `Service ${updatedStatus}!`)
                    );
                }
            })
            .catch((error) => {
                dispatch(userUpdateOrderStatusFail());
                dispatch(setMessage(MESSAGE_TYPE.warning, error.message));
            });
    };
};
