package com.theloveteam.web.handlers;

public class OrderRequestHandler extends AbstractRequestHandler{
    @Override
    public boolean validatePermissionBeforeProcess() {
        return false;
    }

    @Override
    public void validateRequestBeforeProcess() {

    }

    @Override
    public void processRequest() {

    }

    @Override
    public boolean validatePermissionAfterProcess() {
        return false;
    }
}
