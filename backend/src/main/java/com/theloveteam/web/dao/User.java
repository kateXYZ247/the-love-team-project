package com.theloveteam.web.dao;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "users")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="user_id")
    private Long userId;

    private String account;

    @Column(nullable = false)
    private String password;

    @Column(name="first_name", nullable = false)
    private String firstName;

    @Column(name="last_name", nullable = false)
    private String lastName;

    private String address;

    private String zip;

    @Column(name="geohash")
    private String geoHash;

    @Column(nullable = false)
    private String email;

    private String phone;//is phone necessary when register?

    @Column(name="last_logged_in")
    private Timestamp lastLoggedInTime;

    @Column(nullable = false)
    private String role; //user is default to be user when register

}
