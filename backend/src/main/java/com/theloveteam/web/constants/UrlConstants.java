package com.theloveteam.web.constants;

public class UrlConstants {
    public static final String HELLO = "/hello";

    public static final String PRODUCTS = "/products";
    public static final String USERS_REGISTER = "/users/register";
    public static final String LOGIN = "/**/login";
    public static final String USERS_DETAILS = "/users/{userId}";
    public static final String SERVICES_BY_QUERY = "/services";
    public static final String SERVICES_BY_SERVICE_ID = "/services/{serviceId}";
//    public static final String SERVICES_BY_PROVIDER_ID = "/services/";
    public static final String ORDERS = "/orders";
    public static final String ORDERS_BY_USER_ID = "/orders";
    public static final String ORDERS_BY_ADMIN_ID = "/orders/admins/{adminId}";

    // websocket related
    public static final String WS_CONNECTION = "/ws";
    public static final String WS_TOPIC = "/topic";
    public static final String WS_PROVIDERS = "/providers";
    public static final String WS_USER = "/user";
    public static final String WS_APP = "/app";
    public static final String WS_REPLY = "/reply";
    public static final String WS_QUEUE = "/queue";
}
