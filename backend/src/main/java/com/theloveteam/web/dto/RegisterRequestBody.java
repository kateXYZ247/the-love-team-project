package com.theloveteam.web.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Getter
@Setter
public class RegisterRequestBody {
    @NotBlank(message = "Enter you first name")
    private String firstName;

    @NotBlank(message = "Enter you last name")
    private String lastName;

    @Email(message = "Enter a valid email address")
    private String email;

    @NotBlank(message = "Enter you password")
    private String password;

    @NotBlank(message = "Enter you phone number")
    private String phone;


//    @Override
//    public String toString() {
//        return "RegisterRequestBody{" +
//                "firstName='" + firstName + '\'' +
//                ", lastName='" + lastName + '\'' +
//                ", email='" + email + '\'' +
//                ", password='" + password + '\'' +
//                ", phone='" + phone + '\'' +
//                '}';
//    }
}
