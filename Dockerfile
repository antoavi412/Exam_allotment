# Stage 1: Build with Maven in cached layers
FROM maven:3.9-eclipse-temurin-17 AS builder

WORKDIR /build

# Copy only pom.xml - this layer gets cached between builds
COPY pom.xml .

# Download dependencies in separate step for better caching
# Use offline mode and batch download
RUN mvn dependency:resolve -B && \
    mvn dependency:resolve-plugins -B || true

# Copy source code
COPY src ./src

# Build the JAR
RUN mvn clean package -DskipTests -B -q

# Stage 2: Runtime image (lightweight)
FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

# Copy only the built JAR
COPY --from=builder /build/target/exam-seating-1.0.0.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-Xmx512M", "-Xms256M", "-jar", "app.jar"]

