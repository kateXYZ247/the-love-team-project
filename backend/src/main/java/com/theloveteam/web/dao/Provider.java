package com.theloveteam.web.dao;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "providers")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class Provider {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="provider_id")
    private Long providerId;

    private String account;

    @Column(nullable = false)
    private String password;

    @Column(name="first_name", nullable = false)
    private String firstName;

    @Column(name="last_name", nullable = false)
    private String lastName;

    private String address;

    private String zip;

    private Double latitude;

    private Double longitude;

    private String geohash;

    @Column(nullable = false)
    private String email;

    private String phone;//is phone necessary when register?

    @Column(name="last_logged_in")
    private Timestamp lastLoggedInTime;

    @Column(nullable = false)
    private String role; //user is default to be user when register

    private double rating;

    @Column(name="is_available")
    private boolean isAvailable;


    public void setAvailable(boolean availability) {
        isAvailable = availability;
    }
}
