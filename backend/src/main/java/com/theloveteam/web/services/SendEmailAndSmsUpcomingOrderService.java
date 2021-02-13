package com.theloveteam.web.services;

import com.theloveteam.web.dao.*;
import com.theloveteam.web.dto.UpdateServRequestBody;
import com.theloveteam.web.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.Duration;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Locale;
import java.util.concurrent.TimeUnit;

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
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
        Date currentTime = new Date(System.currentTimeMillis());
        int BUFFER = 360;   // 6 hours
        for (Order order : Orders) {
            List<Serv> servs = serviceRepository.getServiceByOrderId(order.getOrderId());
            try {
                if (servs.size() > 0) {
                    String startTimeString = servs.get(0).getStartTime();
                    Date startTime = formatter.parse(startTimeString);
                    long different = startTime.getTime() - currentTime.getTime();
                    if (different >= 0) {
                        long diff = TimeUnit.MINUTES.convert(different, TimeUnit.MILLISECONDS);
                        if (diff <= BUFFER) {
                            System.out.println("diff   " + diff);
                            sendEmailAndSmsForUpcomingOrder(servs);
                            sendEmailAndSmsForUpcomingService(servs);
                        }
                    }
                }
            } catch (ParseException e) {
                e.printStackTrace();
            }
        }
    }

    private void sendEmailAndSmsForUpcomingOrder(List<Serv> services) {
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
        sb.append("\n\nAppointment Time: " + services.get(0).getStartTime());
        sb.append("\n\nEnd Time: " + services.get(0).getEndTime());
        sb.append("\n\nAddress: " + services.get(0).getAddress());
        sb.append("\n\n\nHave a good one! \n\n\n\n -The Love Team");
        String body = sb.toString();

        sendEmailService.sendEmail(user.getEmail(), body, "The Love Team: You have an upcoming appointment");
//        twilioService.sendSms(user.getPhone(), body);
    }

    private void sendEmailAndSmsForUpcomingService(List<Serv> services) {
        StringBuilder sb = new StringBuilder();
        sb.append("You have an upcoming service: \n\n\n");
        for (Serv serv : services) {
            Provider provider = providerRepository.findProviderById(serv.getServiceId());
            if (provider != null) {
                Product product = productRepository.findByProductId(serv.getProductId());
                sb.append(product.getProductName() + "\n");
                sb.append("\n\nAppointment Time: " + services.get(0).getStartTime());
                sb.append("\n\nEnd Time: " + services.get(0).getEndTime());
                sb.append("\n\nAddress: " + services.get(0).getAddress());
                sb.append("\n\n\nHave a good one! \n\n\n\n -The Love Team");
                String body = sb.toString();

        sendEmailService.sendEmail(provider.getEmail(), body, "The Love Team: You have an upcoming service");
//        twilioService.sendSms(provider.getPhone(), body);
            }
        }
    }
}
