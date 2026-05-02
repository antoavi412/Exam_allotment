# Simple runtime image - JAR is pre-built and committed
FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

# Copy pre-built JAR from git repository
COPY target/exam-seating-1.0.0.jar app.jar

# Expose port
EXPOSE 8080

# Run the application with optimized JVM settings
ENTRYPOINT ["java", "-Xmx512M", "-Xms256M", "-jar", "app.jar"]
