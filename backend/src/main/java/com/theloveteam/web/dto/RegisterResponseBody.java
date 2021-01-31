package com.theloveteam.web.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@Getter
public class RegisterResponseBody {
    private List<String> errorMessage;
    @Setter
    private String successMessage;

    public void addErrorMsg(String message) {
        if (errorMessage == null) {
            errorMessage = new ArrayList<>();
        }
        errorMessage.add(message);
    }

}
