package com.theloveteam.web.dao;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class GeoResult {
    private String formatted;
    private Geometry geometry;
}
