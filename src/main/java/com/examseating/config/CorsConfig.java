package com.examseating.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // Configure CORS for all endpoints
        // Using allowedOriginPatterns instead of allowedOrigins to avoid credential conflicts
        registry.addMapping("/**")
                .allowedOriginPatterns("*")           // Allow all origins using patterns
                .allowedMethods("*")                   // Allow all HTTP methods
                .allowedHeaders("*")                   // Allow all headers
                .allowCredentials(false)               // Do NOT allow credentials (required with wildcard)
                .maxAge(3600)                          // Cache CORS response for 1 hour
                .exposedHeaders("*");                  // Expose all headers to clients
    }
}
