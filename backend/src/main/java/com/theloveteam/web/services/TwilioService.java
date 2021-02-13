package com.theloveteam.web.services;


import java.net.URI;
import java.util.Arrays;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;

@Service
public class TwilioService {

    @Value("${twilio.account_SID}")
    private String ACCOUNT_SID;

    @Value("${twilio.auth_token}")
    private String AUTH_TOKEN;

    @Value("${twilio.trial_number}")
    private String PHONE_NUMBER;

    public void sendSms(String to, String body) {

        try {
            Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
            Message message = Message.creator(new PhoneNumber(to), new PhoneNumber(PHONE_NUMBER), body).create();
            System.out.println(message);
            System.out.println(message.getSid());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}