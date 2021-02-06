package com.theloveteam.web.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.theloveteam.web.model.ServiceStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class AllRequestedServsRequestBody {
    private Long providerId;
    private String status;
}
