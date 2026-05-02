# Stage 1: Build with Maven
FROM maven:3.9-eclipse-temurin-17 AS builder

WORKDIR /build
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests -B -q

# Stage 2: Runtime
FROM eclipse-temurin:17-jre-alpine

WORKDIR /app
COPY --from=builder /build/target/exam-seating-1.0.0.jar app.jar

EXPOSE 8080

CMD ["java", "-Xmx512M", "-Xms256M", "-jar", "app.jar"]




