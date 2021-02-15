package com.theloveteam.web.handlers;

import ch.hsr.geohash.GeoHash;
import com.theloveteam.web.constants.UrlConstants;
import com.theloveteam.web.dao.*;
import com.theloveteam.web.exceptions.RoleNotMatchException;
import com.theloveteam.web.external.GeoClient;
import com.theloveteam.web.model.Role;
import com.theloveteam.web.model.TokenSubject;
import com.theloveteam.web.repositories.ProductRepository;
import com.theloveteam.web.repositories.ProviderRepository;
import com.theloveteam.web.repositories.ServiceRepository;
import com.theloveteam.web.repositories.UserRepository;
import com.theloveteam.web.services.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.client.HttpClientErrorException;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Component
public class PlaceOrderHandler extends AbstractRequestHandler<OrderRequest, String> {
    @Autowired
    private ServService servService;

    @Autowired
    private OrderService orderService;

    @Autowired

    private ProviderService providerService;

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    @Autowired
    private GeoClient geoClient;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    ServiceRepository serviceRepository;

    @Autowired
    ProductRepository productRepository;

    @Autowired
    private SendEmailService sendEmailService;

    @Autowired
    private TwilioService twilioService;
    private ProviderRepository providerRepository;

    @Override
    protected String processRequest(OrderRequest orderRequest) {
        Long userId = orderRequest.getUserId();
        Order order = new Order();
        order.setUserId(userId);
        order.setStatus("requested");
        order.setCard(orderRequest.getCredit());
        order.setTotalPrice(orderRequest.getTotalPrice());
        long orderId = orderService.placeOrder(order);

        List<Long> providerIds = providerService.getOnlineProviderIds();
        System.out.println("provider Ids: " + providerIds.toString());
        List<Serv> servs = new ArrayList<>();
        for (int i = 0; i < orderRequest.getServs().size(); i++) {

            Serv serv = Serv.builder().orderId(orderId)
                    .userId(userId)
                    .startTime(orderRequest.getServs().get(i).getStartTime())
                    .endTime(orderRequest.getServs().get(i).getEndTime())
                    .productId(orderRequest.getServs().get(i).getProductId())
                    .productName(orderRequest.getServs().get(i).getProductName())
                    .productPrice(orderRequest.getServs().get(i).getProductPrice())
                    .address(orderRequest.getServs().get(i).getAddress())
                    .latitude(orderRequest.getServs().get(i).getLatitude())
                    .longitude(orderRequest.getServs().get(i).getLongitude())
                    .status("requested")
                    .apartment(orderRequest.getServs().get(i).getApartment())
                    .pets(orderRequest.getServs().get(i).getPets())
                    .direction(orderRequest.getServs().get(i).getDirection())
                    .addressType(orderRequest.getServs().get(i).getAddressType())
                    .build();

            try {
                if (serv.getLatitude() == null || serv.getLongitude() == null) {
                    GeoData geoData = geoClient.getGeoData(orderRequest.getServs().get(i).getAddress() + " united " +
                            "states");
                    if (geoData != null && geoData.getTotalResults() >= 1) {
                        Double lat = geoData.getResults().get(0).getGeometry().getLat();
                        Double lng = geoData.getResults().get(0).getGeometry().getLng();
                        serv.setLatitude(lat);
                        serv.setLongitude(lng);
                    }
                }
                if (serv.getLatitude() != null && serv.getLongitude() != null) {
                    String geohash = GeoHash.geoHashStringWithCharacterPrecision(serv.getLatitude(),
                            serv.getLongitude(), 12);
                    serv.setGeohash(geohash);
                }
            } catch (HttpClientErrorException e) {
                // TODO: handle error correctly instead of print
            }

            servService.createService(serv);
            servs.add(serv);

        }
        servs.stream().forEach(serv ->
                // push notification to online providers
                pushNotificationToProviders(serv, providerIds));

        sendEmailAndSmsAfterNewOrder(orderRequest);

        return "Order is Successfully Placed!";
    }

    @Override
    protected void validatePermissionBeforeProcess(OrderRequest orderRequest) {
        TokenSubject tokenSubject =
                (TokenSubject) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (!Role.user.equals(tokenSubject.getRole())
                || !tokenSubject.getUserId().equals(orderRequest.getUserId().toString())) {
            throw new RoleNotMatchException();
        }
    }

    private void pushNotificationToProviders(Serv serv, List<Long> providerIds) {
        if (providerIds == null || providerIds.size() == 0) {
            return;
        }
        String validGeo = serv.getGeohash().substring(0, 3);
        //match provider supported products
        List<Long> validProviderIds = providerService.getProviderIdsByProductId(serv.getProductId(), providerIds);
        //match provider geoHash
        List<Provider> providerList = validProviderIds.stream()
                .filter(Objects::nonNull)
                .map(id -> providerRepository.findProviderByID(id).orElse(null))
                .filter(Objects::nonNull)
                .collect(Collectors.toList());
        List<Provider> supportedProviderList = providerList.stream()
                .filter(provider -> provider.getGeohash() != null)
                .filter(provider -> provider.getGeohash().substring(0, 3).equals(validGeo))
                .collect(Collectors.toList());
        List<Long> supportedProviderIds = supportedProviderList.stream()
                .map(Provider::getProviderId)
                .collect(Collectors.toList());

        System.out.println("available providers: " + serv.getProductId().toString() + ", " + supportedProviderIds.toString());
        serv = servService.removeAddressInfo(serv);
        for (Long providerId : supportedProviderIds) {
            simpMessagingTemplate.convertAndSendToUser(
                    Long.toString(providerId), UrlConstants.WS_REPLY, serv);
        }
    }

    private void sendEmailAndSmsAfterNewOrder(OrderRequest orderRequest) {
        StringBuilder sb = new StringBuilder();
        User user = userRepository.findUserByID(orderRequest.getUserId());
        List<Long> servIdList = new ArrayList<>();
        for (Serv serv : orderRequest.getServs()) {
            servIdList.add(serv.getProductId());
        }
        List<Product> products = productRepository.findByProductIds(servIdList);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
        DateTimeFormatter printFormatter = DateTimeFormatter.ofPattern("MM/dd/yyyy HH:mm");
        LocalDateTime startTime = LocalDateTime.parse(orderRequest.getServs().get(0).getStartTime(), formatter);
        ZonedDateTime PSTStartTime = ZonedDateTime.ofInstant(startTime, ZoneOffset.UTC, ZoneId.of("America/Los_Angeles"));


        sb.append("Dear " + user.getLastName() +
                ",\n\nYou placed an new order: \n\n\n");
        for (Product product : products) {
            sb.append(product.getProductName() + "\n");
        }
        sb.append("\n\nTotal Price: $" + String.format("%.2f", orderRequest.getTotalPrice()));
        sb.append("\n\nAppointment Time: " + printFormatter.format(PSTStartTime) + " PST");
        sb.append("\n\nAddress: " + orderRequest.getServs().get(0).getAddress());
        sb.append("\n\n\nThank you very much! \n\n\n\n -The Love Team");
        String body = sb.toString();
        sendEmailService.sendEmail(user.getEmail(), body, "The Love Team: New Order");
        twilioService.sendSms(user.getPhone(), body);
    }
}
