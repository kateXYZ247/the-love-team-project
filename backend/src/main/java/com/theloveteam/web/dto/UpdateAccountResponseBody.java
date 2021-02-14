package com.theloveteam.web.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@Getter
@Setter
public class UpdateAccountResponseBody {
    private String successMsg;
    private List<String> errorMsg;

    public void addErrorMsg(String msg) {
        if (errorMsg.isEmpty()) {
            errorMsg = new ArrayList<>();
        }
        errorMsg.add(msg);
    }
}
