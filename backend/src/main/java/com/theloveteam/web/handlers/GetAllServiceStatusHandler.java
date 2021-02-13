package com.theloveteam.web.handlers;

import com.theloveteam.web.dto.StatResponseBody;
import com.theloveteam.web.exceptions.RoleNotMatchException;
import com.theloveteam.web.model.Role;
import com.theloveteam.web.model.StatDetail;
import com.theloveteam.web.model.TokenSubject;
import com.theloveteam.web.repositories.ServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.util.List;
@Component
public class GetAllServiceStatusHandler extends AbstractRequestHandler<String, StatResponseBody>{
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
    protected StatResponseBody processRequest(String adminId) {
        List<StatDetail> StatList = serviceRepository.getStatusByAdminId();
        Long totalNumber = serviceRepository.getAllServiceNumber();
        System.out.println(Long.parseLong(adminId));
        System.out.println(StatList);
        System.out.println(totalNumber);
        StatResponseBody statResponseBody = StatResponseBody.builder().statList(StatList).total(totalNumber).build();
        return statResponseBody;
    }

}
