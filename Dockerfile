# Multi-stage build for Spring Boot with Maven
# Stage 1: Build with Maven
FROM maven:3.9-eclipse-temurin-17 AS builder

WORKDIR /app

# Copy pom.xml first for layer caching
COPY pom.xml .

# Download dependencies (this layer gets cached)
RUN mvn dependency:go-offline -B

# Copy source code
COPY src ./src

# Build the application with optimized settings
RUN mvn clean package -DskipTests -B \
    -Dorg.slf4j.simpleLogger.defaultLogLevel=warn \
    -Dmaven.wagon.http.retryHandler.count=3 \
    -Dmaven.wagon.http.pool=true

# Stage 2: Runtime with lightweight Java image
FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

# Copy JAR from builder stage
COPY --from=builder /app/target/exam-seating-1.0.0.jar app.jar

# Expose port
EXPOSE 8080

# Run the application with optimized JVM settings
ENTRYPOINT ["java", "-Xmx256M", "-Xms128M", "-jar", "app.jar"]
