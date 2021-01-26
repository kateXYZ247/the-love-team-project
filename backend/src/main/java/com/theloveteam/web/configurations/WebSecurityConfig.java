package com.theloveteam.web.configurations;

import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@EnableAutoConfiguration
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
//  private final JwtTokenFilter jwtTokenFilter;
//
//  public WebSecurityConfig(@Lazy JwtTokenFilter jwtTokenFilter) {
//    this.jwtTokenFilter = jwtTokenFilter;
//  }

  @Override
  protected void configure(HttpSecurity http) throws Exception {
    // Enable CORS and disable CSRF
    http = http.cors().and().csrf().disable();

    // No session will be created or used by spring security
    // http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

    // Entry points
    http.authorizeRequests()//
        .antMatchers("/hello").permitAll()//
        .antMatchers("/products").permitAll()
        .antMatchers("/users/login").permitAll()//
        .antMatchers("/users/register").permitAll()//
        .antMatchers("/gs-guide-websocket/**", "/topic/**", "/app/**", "/user/**").permitAll()
        .antMatchers("/test").authenticated()
        // Disallow everything else..
        .anyRequest().hasRole("ADMIN");

    // If a user try to access a resource without having enough permissions
    http.exceptionHandling().accessDeniedPage("/login");

    // http.addFilterBefore(jwtTokenFilter, UsernamePasswordAuthenticationFilter.class);

  }

  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder(12);
  }

  @Bean
  public AuthenticationManager getAuthenticationManager() throws Exception {
    return super.authenticationManagerBean();
  }
}
