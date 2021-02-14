package com.theloveteam.web.configurations;
import com.theloveteam.web.services.SendEmailAndSmsUpcomingOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;

@Configuration
@EnableScheduling
public class JobSchedulerConfig {

    @Autowired
    SendEmailAndSmsUpcomingOrderService sendEmailAndSmsUpcomingOrderService;

    @Scheduled(fixedDelay = 21000000L)  //6 hours
    public void SendEmailAndSmsUpcomingOrderJob() {
        sendEmailAndSmsUpcomingOrderService.start();
    }
}
