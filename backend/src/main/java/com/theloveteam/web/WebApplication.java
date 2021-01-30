package com.theloveteam.web;

import com.theloveteam.web.dao.Order;
import com.theloveteam.web.dao.Service;
import com.theloveteam.web.repositories.OrderRepository;
import com.theloveteam.web.repositories.ServiceRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
public class WebApplication {

  @Bean
  public BCryptPasswordEncoder bCryptPasswordEncoder() {
    return new BCryptPasswordEncoder();
  }

  public static void main(String[] args) {
    SpringApplication.run(WebApplication.class, args);
  }

// Manually Delete Items from Order Table
//  @Bean
//  CommandLineRunner commandLineRunner(OrderRepository orderRepository) {
//    return args -> {
//      for (Long id = 21l; id <= 22l; id++) {
//        orderRepository.deleteOrderById(id);
//      }
//    };
//  }

//    @Bean
//  CommandLineRunner commandLineRunner(OrderRepository orderRepository) {
//    return args -> {
//      for (Long id = 16l; id <= 18l; id++) {
//        orderRepository.updateStatusByOrderId(id, "requested");
//      }
//      orderRepository.updateStatusByOrderId(19l, "accepted");
//      orderRepository.updateStatusByOrderId(20l, "finished");
//    };
//  }

}
