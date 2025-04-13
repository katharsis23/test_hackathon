FROM mysql:8.0


WORKDIR /backend/


ENV MYSQL_ALLOW_EMPTY_PASSWORD=yes
ENV MYSQL_DATABASE=ANIMAL_SHELTER
ENV MYSQL_USER=hackathon_user
ENV MYSQL_PASSWORD=hackathon_2025


COPY ./init.sql /docker-entrypoint-initdb.d/


COPY ./backup.sql /docker-entrypoint-initdb.d/


EXPOSE 3306

