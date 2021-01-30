package com.theloveteam.web.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Getter
@Setter
public class RegisterRequestBody {
    @NotBlank(message = "Please enter your first name")
    private String firstName;

    @NotBlank(message = "Please enter your last name")
    private String lastName;

    @NotBlank(message = "Please enter your email")
    @Email(message = "Enter a valid email address")
    private String email;

    @NotBlank(message = "Please enter your password")
    private String password;

    @NotBlank(message = "Please enter your phone number")
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
