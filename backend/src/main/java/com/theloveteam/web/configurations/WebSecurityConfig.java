package com.theloveteam.web.configurations;

import com.theloveteam.web.security.JWTAuthenticationFilter;
import com.theloveteam.web.security.JWTAuthorizationFilter;
import com.theloveteam.web.services.SecurityService;
import com.theloveteam.web.utils.JWTUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import static com.theloveteam.web.security.SecurityConstants.SIGN_UP_URL;

//@Configuration
//@EnableAutoConfiguration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
//  private final JwtTokenFilter jwtTokenFilter;
//
//  public WebSecurityConfig(@Lazy JwtTokenFilter jwtTokenFilter) {
//    this.jwtTokenFilter = jwtTokenFilter;
//  }

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
//    JWTAuthenticationFilter customFilter = new JWTAuthenticationFilter(authenticationManager());
//    customFilter.setFilterProcessesUrl("/users/login");

    // No session will be created or used by spring security
    // http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

    // Entry points
    http.authorizeRequests()//
        .antMatchers("/hello").permitAll()//
        .antMatchers("/products").permitAll()
        .antMatchers("/users/register").permitAll()//
        .antMatchers("/gs-guide-websocket/**", "/topic/**", "/app/**", "/user/**").permitAll()
        .antMatchers("/test").authenticated()
           // .antMatchers(HttpMethod.POST, SIGN_UP_URL).permitAll()//
        // Disallow everything else..
        .anyRequest().authenticated()
            .and()
            .addFilter(new JWTAuthenticationFilter(authenticationManager()))
            .addFilter(new JWTAuthorizationFilter(authenticationManager()))
            .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

    // If a user try to access a resource without having enough permissions
    //http.exceptionHandling().accessDeniedPage("/login");

    // http.addFilterBefore(jwtTokenFilter, UsernamePasswordAuthenticationFilter.class);

  }

  @Override
  public void configure(AuthenticationManagerBuilder auth) throws Exception {
    auth.userDetailsService(securityService).passwordEncoder(bCryptPasswordEncoder);
  }

  @Bean
  CorsConfigurationSource corsConfigurationSource() {
    final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", new CorsConfiguration().applyPermitDefaultValues());
    return source;//open to requests from any source
  }

//  @Bean
//  public PasswordEncoder passwordEncoder() {
//    return new BCryptPasswordEncoder(12);
//  }
//
//  @Bean
//  public AuthenticationManager getAuthenticationManager() throws Exception {
//    return super.authenticationManagerBean();
//  }
}
