FROM maven:3.9-eclipse-temurin-17

WORKDIR /app

COPY . .

RUN mvn clean package -DskipTests -B -q

FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

COPY --from=0 /app/target/exam-seating-1.0.0.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-Xmx512M", "-Xms256M", "-jar", "app.jar"]


