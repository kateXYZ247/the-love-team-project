package com.theloveteam.web.handlers;

import org.springframework.http.ResponseEntity;

public abstract class AbstractRequestHandler<RequestBody, ResponseBody> {

    /**
     * Entry point to main method, after previous validation success
     */
    protected abstract ResponseBody processRequest(RequestBody requestBody);

    /**
     * Perform customized logic to handle the request
     */
    public ResponseEntity<ResponseBody> handle(RequestBody requestBody){

        validatePermissionBeforeProcess(requestBody);

        validateRequestBeforeProcess(requestBody);

        ResponseBody response = processRequest(requestBody);

        validatePermissionAndResponseAfterProcess(requestBody, response);

        return ResponseEntity.ok().body(response);
    }

    /**
     * This is for verify Role, if role from token is equal to the role permitted in this process
     * The default behavior is passing this validation
     */
    protected void validatePermissionBeforeProcess(RequestBody requestBody){

    }

    /**
     * This is for validate the Request Body, check if all required info is correct before save to database
     * The default behavior is passing this validation
     */
    protected void validateRequestBeforeProcess(RequestBody requestBody){

    }

    /**
     * After main logic method finished, based on the return result check the permission
     * and update result based on the permission
     * FOR EXAMPLE: when we get Orders info of a given User ID, after we process the request, get the Orders info,
     * before sending back, check if the orders real User ID is match the User ID in request body.
     * The default behavior is passing this validation
     */
    protected  void validatePermissionAndResponseAfterProcess(RequestBody requestBody, ResponseBody responseBody){

    }
}
