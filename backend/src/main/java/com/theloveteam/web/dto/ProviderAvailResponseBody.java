package com.theloveteam.web.dto;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@Getter
public class ProviderAvailResponseBody {
    private List<String> errorMsg;

    @Setter
    private String successMsg;

    public void addErrorMsg(String msg) {
        if (errorMsg.isEmpty()) {
            errorMsg = new ArrayList<>();
        }
        errorMsg.add(msg);
    }

}
