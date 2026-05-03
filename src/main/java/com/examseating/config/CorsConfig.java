package com.examseating.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // This configuration should be the ONLY CORS config in the app
        // It explicitly disallows credentials to avoid conflicts with wildcard origins
        registry.addMapping("/**") // Apply to all endpoints
                .allowedOriginPatterns("*") // Allow all origins (using patterns)
                .allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS")
                .allowedHeaders("*") // Allow all headers
                .exposedHeaders("*") // Expose all headers
                .allowCredentials(false) // MUST be false when using wildcard
                .maxAge(3600); // Cache for 1 hour
    }
}
