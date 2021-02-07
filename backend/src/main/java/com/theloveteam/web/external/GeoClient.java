package com.theloveteam.web.external;

import com.theloveteam.web.constants.UrlConstants;
import com.theloveteam.web.dao.GeoData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestOperations;

import java.util.HashMap;
import java.util.Map;

@Component
public class GeoClient {

    @Autowired
    private RestOperations restOperations;

    public GeoData getGeoData (@Value("${address}") final String address) {
        String url = UrlConstants.GEOCLIENT_URL;
        Map<String, String> map = new HashMap<>();
        map.put("address", address);
        return restOperations.getForObject(url, GeoData.class, map);
    }
}
