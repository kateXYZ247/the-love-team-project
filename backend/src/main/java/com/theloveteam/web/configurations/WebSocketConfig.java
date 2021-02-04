package com.theloveteam.web.configurations;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.theloveteam.web.model.Role;
import com.theloveteam.web.model.TokenSubject;
import com.theloveteam.web.utils.JWTUtils;
import com.theloveteam.web.utils.JsonUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;


import java.util.ArrayList;

import static org.springframework.core.Ordered.HIGHEST_PRECEDENCE;

@Configuration
@EnableWebSocketMessageBroker
@Order(HIGHEST_PRECEDENCE + 50)
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {
    @Value("${CORS_CFG_ALLOWED}")
    String origins;

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        // messages whose destination starts with “/app” should be routed to message-handling methods
        config.setApplicationDestinationPrefixes("/app");
        // messages whose destination starts with “/topic” should be routed to the message broker
        // Message broker broadcasts messages to all the connected clients who are subscribed to a particular topic
        config.enableSimpleBroker("/queue/", "/topic/", "/user/");
        config.setUserDestinationPrefix("/user");
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        // SockJS is used to enable fallback options for browsers that don’t support websocket
        registry.addEndpoint("/ws").setAllowedOrigins(origins.split(",")).withSockJS();
        // allow subscribers
        registry.addEndpoint("/topic/greetings").setAllowedOrigins("*").withSockJS();
    }

    @Override
    public final void configureClientInboundChannel(ChannelRegistration registration) {
        registration.interceptors(new ChannelInterceptor() {
            @Override
            public Message<?> preSend(Message<?> message, MessageChannel channel) {
                StompHeaderAccessor accessor =
                    MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);
                if (StompCommand.CONNECT.equals(accessor.getCommand())) {
                    // get token from STOMP headers
                    String token = accessor.getNativeHeader("Authorization").get(0);
                    try {
                        // parse and verify token
                        String tokenSubjectJson = JWTUtils.parseSubjectFromToken(token);
                        if (tokenSubjectJson != null) {
                            TokenSubject tokenSubject = JsonUtils.convertJsonStringToObject(tokenSubjectJson,
                                TokenSubject.class);
                            // only allow provider to connect for now
                            if (!Role.provider.equals(tokenSubject.getRole())) {
                                return null;
                            }
                            Authentication auth = new UsernamePasswordAuthenticationToken(
                                tokenSubject,
                                null,
                                new ArrayList<>());
                            accessor.setUser(auth);
                        }
                    } catch (JsonProcessingException e) {
                        e.printStackTrace();
                    }
                }
                return message;
            }
        });
    }

}