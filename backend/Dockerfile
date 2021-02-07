FROM ubuntu:latest
MAINTAINER TLT "The Love Team@TLT"
RUN apt-get update && apt-get install -y openjdk-8-jdk

ENV version=docker
ENV jdbcurl=
ENV dbuser=
ENV dbpasswd=
ENV jwt_secret_key=
ENV envCORSAllowed=

WORKDIR /usr/local/bin/
ADD target/tlt-backend.jar .
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "tlt-backend.jar"]