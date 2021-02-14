package com.theloveteam.web.services;

import com.theloveteam.web.dao.*;
import com.theloveteam.web.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.*;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Service
public class SendEmailAndSmsUpcomingOrderService {
    @Autowired
    ServiceRepository serviceRepository;

    @Autowired
    ProviderRepository providerRepository;

    @Autowired
    ProductRepository productRepository;

    @Autowired
    OrderRepository orderRepository;

    @Autowired
    private SendEmailService sendEmailService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TwilioService twilioService;


    public void start() {
        List<Order> Orders = orderRepository.gerAllUpcomingOrders();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
        DateTimeFormatter printFormatter = DateTimeFormatter.ofPattern("MM/dd/yyyy HH:mm");

        int BUFFER = 21600000;   // 6  hours in Milliseconds
        for (Order order : Orders) {
            List<Serv> servs = serviceRepository.getServiceByOrderId(order.getOrderId());
            if (servs.size() > 0) {
                LocalDateTime SerStartTime = LocalDateTime.parse(servs.get(0).getStartTime(), formatter);
                LocalDateTime SerEndTime = LocalDateTime.parse(servs.get(0).getEndTime(), formatter);
                Instant instant = Instant.now();
                LocalDateTime UTCLocalTime = LocalDateTime.ofInstant(instant, ZoneOffset.UTC);
                Duration duration = Duration.between(UTCLocalTime, SerStartTime);
                ZonedDateTime PSTStartTime = ZonedDateTime.ofInstant(SerStartTime, ZoneOffset.UTC, ZoneId.of("America/Los_Angeles"));
                ZonedDateTime PSTEndTime = ZonedDateTime.ofInstant(SerEndTime, ZoneOffset.UTC, ZoneId.of("America/Los_Angeles"));
                ZonedDateTime PSTLocalTime = ZonedDateTime.ofInstant(UTCLocalTime, ZoneOffset.UTC, ZoneId.of("America/Los_Angeles"));
                String startTime = printFormatter.format(PSTStartTime);
                String endTime = printFormatter.format(PSTEndTime);
                long durationInMillis = duration.toMillis();

                if (durationInMillis >= 0 && durationInMillis <= BUFFER) {
//                    System.out.println("toMinutes " + duration.toMinutes() + "::::sss::::" + servs);
//                    System.out.println("startTime   " + startTime);
//                    System.out.println("localT   " + printFormatter.format(PSTLocalTime));
//                    System.out.println("durationInMillis   " + durationInMillis);
                    sendEmailAndSmsForUpcomingOrder(servs, startTime, endTime);
                    sendEmailAndSmsForUpcomingService(servs, startTime, endTime);
                }
            }
        }
    }

    private void sendEmailAndSmsForUpcomingOrder(List<Serv> services, String startTime, String endTime) {
        StringBuilder sb = new StringBuilder();
        User user = userRepository.findUserByID(services.get(0).getUserId());
        System.out.println("user:  " + user.getEmail());
        List<Long> servIdList = new ArrayList<>();
        for (Serv serv : services) {
            servIdList.add(serv.getProductId());
        }
        List<Product> products = productRepository.findByProductIds(servIdList);

        sb.append("You have an upcoming appointment: \n\n\n");
        for (Product product : products) {
            sb.append(product.getProductName() + "\n");
        }
        sb.append("\n\nAppointment Time: " + startTime + " PST");
        sb.append("\n\nEnd Time: " + endTime + " PST");
        sb.append("\n\nAddress: " + services.get(0).getAddress());
        sb.append("\n\n\nHave a good one! \n\n\n\n -The Love Team");
        String body = sb.toString();

        sendEmailService.sendEmail(user.getEmail(), body, "The Love Team: You have an upcoming appointment");
        twilioService.sendSms(user.getPhone(), body);
    }

    private void sendEmailAndSmsForUpcomingService(List<Serv> services, String startTime, String endTime) {
        StringBuilder sb = new StringBuilder();
        sb.append("You have an upcoming service: \n\n\n");
        for (Serv serv : services) {
            Provider provider = providerRepository.findProviderById(serv.getServiceId());
            if (provider != null) {
                Product product = productRepository.findByProductId(serv.getProductId());
                sb.append(product.getProductName() + "\n");
                sb.append("\n\nAppointment Time: " + startTime);
                sb.append("\n\nEnd Time: " + endTime);
                sb.append("\n\nAddress: " + services.get(0).getAddress());
                sb.append("\n\n\nHave a good one! \n\n\n\n -The Love Team");
                String body = sb.toString();

                sendEmailService.sendEmail(provider.getEmail(), body, "The Love Team: You have an upcoming service");
                twilioService.sendSms(provider.getPhone(), body);
            }
        }
    }
}
