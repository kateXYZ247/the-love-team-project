package com.theloveteam.web;

import ch.hsr.geohash.GeoHash;
import com.theloveteam.web.dao.GeoData;
import com.theloveteam.web.dao.Provider;
import com.theloveteam.web.external.GeoClient;
import com.theloveteam.web.repositories.ProviderRepository;
import com.theloveteam.web.services.ProviderService;
import org.springframework.beans.factory.annotation.Autowired;
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
//  @Autowired
//  private ProviderService providerService;
//  @Autowired
//  private ProviderRepository providerRepository;
//  @Bean
//  CommandLineRunner commandLineRunner(GeoClient geoClient) {
//    return args -> {
//      System.out.println("-------");
//      String address = providerService.getProviderByProviderId(2l).map(Provider::getAddress).orElse("");
//      System.out.println(address);
//      GeoData geoData = geoClient.getGeoData( address + " united states");
//      System.out.println(geoData.toString());
//      Double lat = geoData.getResults().get(0).getGeometry().getLat();
//      Double lng = geoData.getResults().get(0).getGeometry().getLng();
//      String geohash = GeoHash.geoHashStringWithCharacterPrecision(lat, lng, 12);
//      System.out.println(geohash);
//      providerRepository.updateProviderGeodataByID(2l, lat, lng, geohash);
//    };
//  }
}
