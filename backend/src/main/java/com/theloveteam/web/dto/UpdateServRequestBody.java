package com.theloveteam.web.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.theloveteam.web.model.ServiceStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class UpdateServRequestBody {
    private String serviceId;
    private String userId;
    private String status;
    private String startTime;
    private String endTime;
}
