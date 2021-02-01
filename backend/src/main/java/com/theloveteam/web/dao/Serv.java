package com.theloveteam.web.dao;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.sql.Timestamp;

import static javax.persistence.GenerationType.SEQUENCE;

@Entity
@Data
@Builder
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
@Table(name = "services")
public class Serv {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "service_id")
    private Long serviceId;

    @Column(name = "order_id")
    private Long orderId;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "provider_id")
    private Long providerId;

    @Column(name = "start_time")
    private String startTime;

    @Column(name = "end_time")
    private String endTime;

    @UpdateTimestamp
    @Column(name = "created_at")
    private Timestamp createdAt;

    @Column(name = "product_id")
    private Long productId;

    private Double subprice;

    private Double latitude;

    private Double longitude;

    private String address;

    private String note;

    private Integer rating;

    private String status;

    private String apartment;

    private String pets;

    private String direction;

    @Column(name = "address_type")
    private String addressType;

}
