package com.theloveteam.web.handlers;

public abstract class AbstractRequestHandler {
    public abstract boolean validatePermissionBeforeProcess();
    public abstract void validateRequestBeforeProcess();
    public abstract void processRequest();
    public abstract boolean validatePermissionAfterProcess();

    public void handle(){
        validatePermissionBeforeProcess();
        validateRequestBeforeProcess();
        processRequest();
        validatePermissionAfterProcess();
    }
}
