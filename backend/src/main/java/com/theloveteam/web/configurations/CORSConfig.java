package com.theloveteam.web.configurations;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CORSConfig implements WebMvcConfigurer {
    @Value("${CORS_CFG_ALLOWED}")
    String origins;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
            .allowedOrigins(origins.split(",")).allowedMethods("*").exposedHeaders("Content-Type",
                "Access-Control-Allow-Origin", "Access-Control-Allow-Headers", "Origin", "Authorization",
                "X-Requested-With", "requestId", "Correlation-Id");
    }
}
