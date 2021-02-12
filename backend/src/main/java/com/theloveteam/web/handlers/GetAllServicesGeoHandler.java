
package com.theloveteam.web.handlers;

import com.theloveteam.web.dao.Serv;
import com.theloveteam.web.dto.GeoResponseBody;
import com.theloveteam.web.dto.ServsResponseBody;
import com.theloveteam.web.dto.StatResponseBody;
import com.theloveteam.web.exceptions.RoleNotMatchException;
import com.theloveteam.web.model.GeoDetail;
import com.theloveteam.web.model.Role;
import com.theloveteam.web.model.StatDetail;
import com.theloveteam.web.model.TokenSubject;
import com.theloveteam.web.repositories.ServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.util.List;
@Component
public class GetAllServicesGeoHandler extends AbstractRequestHandler<String, GeoResponseBody>{

    @Autowired
    private ServiceRepository serviceRepository;

    @Override
    protected void validatePermissionBeforeProcess(String adminId) {
        TokenSubject tokenSubject = (TokenSubject) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (!Role.admin.equals(tokenSubject.getRole()) || !tokenSubject.getUserId().equals(adminId)) {
            throw new RoleNotMatchException();
        }
    }

    @Override
    protected GeoResponseBody processRequest(String adminId) {
        List<GeoDetail> AllGeoList= serviceRepository.getAllGeoByAdminId();

        System.out.println(Long.parseLong(adminId));
        System.out.println(AllGeoList);
     GeoResponseBody geoResponseBody = GeoResponseBody.builder().allGeoList(AllGeoList).build();
        return geoResponseBody;


    }


}
