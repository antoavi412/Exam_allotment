#!/bin/sh
set -e

# Pass environment variables to Java as system properties
exec java \
  -Xmx512M \
  -Xms256M \
  -Dspring.datasource.url=${SPRING_DATASOURCE_URL:-jdbc:postgresql://localhost:5432/exam_seating} \
  -Dspring.datasource.username=${SPRING_DATASOURCE_USERNAME:-postgres} \
  -Dspring.datasource.password=${SPRING_DATASOURCE_PASSWORD:-postgres} \
  -jar app.jar
