package com.theloveteam.web.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
//@JsonIgnoreProperties(ignoreUnknown = true)
public class UpdateAccountRequestBody {
    private String userId;

    @NotBlank(message = "Your first name should not be empty")
    private String firstName;

    @NotBlank(message = "Your last name should not be empty")
    private String lastName;

    private String address;

    private String zip;

    @NotBlank(message = "Your phone number should not be empty")
    private String phone;

    @Override
    public String toString() {
        return "UpdateAccountRequestBody{" +
                "userId='" + userId + '\'' +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", address='" + address + '\'' +
                ", zip='" + zip + '\'' +
                ", phone='" + phone + '\'' +
                '}';
    }
}
