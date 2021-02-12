
package com.theloveteam.web.dto;

import com.theloveteam.web.dao.Serv;
import com.theloveteam.web.model.GeoDetail;
import com.theloveteam.web.model.StatDetail;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;

import java.util.List;



@Getter
@AllArgsConstructor
@Builder
@Data
public class GeoResponseBody {
    private List<GeoDetail> allGeoList;

}
