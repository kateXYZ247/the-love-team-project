package com.theloveteam.web.configurations;

import com.theloveteam.web.constants.UrlConstants;
import com.theloveteam.web.security.JWTAuthenticationFilter;
import com.theloveteam.web.security.JWTAuthorizationFilter;
import com.theloveteam.web.services.SecurityService;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    private SecurityService securityService;
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public WebSecurityConfig(SecurityService securityService, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.securityService = securityService;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        // Enable CORS and disable CSRF
        http = http.cors().and().csrf().disable();

        // Entry points
        http.authorizeRequests()//
            .antMatchers(UrlConstants.HELLO).permitAll()//
            .antMatchers(UrlConstants.PRODUCTS).permitAll()
            .antMatchers(UrlConstants.USERS_REGISTER).permitAll()//
            .antMatchers("/gs-guide-websocket/**", "/topic/**", "/app/**", "/user/**").permitAll()
            .antMatchers("/test").authenticated()
            // Disallow everything else..
            .anyRequest().authenticated()
            .and()
            .addFilter(new JWTAuthenticationFilter(authenticationManager()))
            .addFilter(new JWTAuthorizationFilter(authenticationManager()))
            // No session will be created or used by spring security
            .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
    }

    @Override
    public void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(securityService).passwordEncoder(bCryptPasswordEncoder);
    }
}
