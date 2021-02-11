package com.theloveteam.web.handlers;


import com.theloveteam.web.constants.UrlConstants;
import ch.hsr.geohash.GeoHash;
import com.theloveteam.web.dao.GeoData;
import com.theloveteam.web.dao.Order;
import com.theloveteam.web.dao.OrderRequest;
import com.theloveteam.web.dao.Serv;
import com.theloveteam.web.exceptions.RoleNotMatchException;
import com.theloveteam.web.external.GeoClient;
import com.theloveteam.web.model.Role;
import com.theloveteam.web.model.TokenSubject;
import com.theloveteam.web.services.OrderService;
import com.theloveteam.web.services.ProviderService;
import com.theloveteam.web.services.ServService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.client.HttpClientErrorException;

import java.util.List;

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
                System.out.println(e);
            }

            servService.createService(serv);
            // push notification to online providers
            pushNotificationToProviders(serv, providerIds);
        }

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
        serv = servService.removeAddressInfo(serv);
        List<Long> validProviderIds = providerService.getProviderIdsByProductId(serv.getProductId(), providerIds);
        System.out.println("available providers: " + serv.getProductId().toString() + ", " + validProviderIds.toString());
        for (Long providerId : validProviderIds) {
            simpMessagingTemplate.convertAndSendToUser(
                Long.toString(providerId), UrlConstants.WS_REPLY, serv);
        }
    }
}
