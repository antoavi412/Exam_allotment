FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY target/exam-seating-1.0.0.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-Xmx512M", "-Xms256M", "-jar", "app.jar"]
