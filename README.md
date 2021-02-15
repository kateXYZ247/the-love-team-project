# The Love Team
## This branch adds Email and SMS notification function to the develop branch

## Setup

### Setup your Mail

Get your login credential (example: Gmail):
- Create & use App Passwords
https://support.google.com/accounts/answer/185833?hl=en


### Setup your Twilio Account:
- Make an account (https://www.twilio.com/try-twilio)
- Get a Number (https://www.twilio.com/console/phone-numbers/search)
- Find your credentials in General Settings (https://www.twilio.com/console/project/settings)
- As a free trial user, you have to add the receiver's number to your Verified Caller IDs for them to receive SMS (https://www.twilio.com/console/phone-numbers/verified)

for more information (https://www.twilio.com/docs/usage/tutorials/how-to-use-your-free-trial-account)



### Make sure the following codes are in the application-test.properties, 
```
#Mail
spring.mail.protocol=smtp
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=spring_mail_username
spring.mail.password=spring_mail_password
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true

#twilio
twilio.account_SID=twilio_account_SID
twilio.auth_token=twilio_auth_token
twilio.trial_number=twilio_trial_number
```

And add
- Gmail address (spring_mail_username)
- App Passwords (spring_mail_password)
- ACCOUNT SID (twilio_account_SID)
- AUTH TOKEN(twilio_auth_token)
- (twilio_trial_number)

to your environment variables.

And add
```
spring_mail_username= GMAIL_ADDRESS;
spring_mail_password= GOOGLE_APP_PASSWORDS;
twilio_account_SID= TWILIO_ACCOUNT_SID;
twilio_auth_token= TWILIO_AUTH_TOKEN;
twilio_trial_number= TWILIO_TRIAL_NUMBER;
```

to your environment variables.
