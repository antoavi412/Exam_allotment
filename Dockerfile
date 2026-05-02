# Stage 1: Build with Maven in cached layers
FROM maven:3.9-eclipse-temurin-17 AS builder

WORKDIR /build

# Copy only pom.xml - this layer gets cached between builds
COPY pom.xml .

# Copy source code
COPY src ./src

# Build the JAR
RUN mvn clean package -DskipTests -B -q

# Stage 2: Runtime image (lightweight)
FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

# Copy the built JAR
COPY --from=builder /build/target/exam-seating-1.0.0.jar app.jar

# Copy entrypoint script
COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

EXPOSE 8080

ENTRYPOINT ["/app/entrypoint.sh"]



