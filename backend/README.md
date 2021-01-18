# The Love Team Web Application Backend

## Project Setup

### Selected dependencies from Spring Boot

- Spring Boot DevTools: automatically rebuild project
- Spring Web
- Spring Security: enable token based authentication/authorization
- Spring WebSocket: private messages between users
- Spring Data JPA
- MySQL Driver: connect to MySQL database
- H2 Driver: in memory database for testing
- PostgreSQL Driver: connect to PostgreSQL
- Validation: entity field validation

### Intellij IDE Setup

- DevTool: [stackoverflow link](https://stackoverflow.com/questions/33869606/intellij-15-springboot-devtools-livereload-not-working)
- Reformat on save, in settings:
  1. check "Activate save actions on save"
  2. check "Reformat file"

### Database setup

- install local [PostgreSQL](https://www.postgresql.org/download/) or setup AWS RDS with PostgresSQL
- add system environment variable: jdbcurl, dbuser, dbpasswd

### Folder Structures
- [/src/main/java/com/theloveteam/web](https://github.com/adayaday/the-love-team/tree/main/backend/src/main/java/com/theloveteam/web) - main source folder
  - [/dao](https://github.com/adayaday/the-love-team/tree/main/backend/src/main/java/com/theloveteam/web/dao) - data access object, corresponding to each data table in database
  - [/dto](https://github.com/adayaday/the-love-team/tree/main/backend/src/main/java/com/theloveteam/web/dto) - data transfer object, object used for non-database data transferring (requestBody, responseBody ...)
  - [/repositories](https://github.com/adayaday/the-love-team/tree/main/backend/src/main/java/com/theloveteam/web/repositories) - directly interact with database
  - [/services](https://github.com/adayaday/the-love-team/tree/main/backend/src/main/java/com/theloveteam/web/services) - logic between a controller and repository
  - [/controllers](https://github.com/adayaday/the-love-team/tree/main/backend/src/main/java/com/theloveteam/web/controllers) - REST API request controller/handler
  - [/security](https://github.com/adayaday/the-love-team/tree/main/backend/src/main/java/com/theloveteam/web/security) - security related (token/authentication/authorization)
- [/src/main/java/resources](https://github.com/adayaday/the-love-team/tree/main/backend/src/main/java/resources) - resource folder (application.properties)
- [/src/test/java/com/theloveteam/web](https://github.com/adayaday/the-love-team/tree/main/backend/src/test/java/com/theloveteam/web) - Unit tests
- [/src/test/java/resources](https://github.com/adayaday/the-love-team/tree/main/backend/src/test/java/com/theloveteam/web) - testing related resources, sql files

### Usage
- Maven: reload/clean/install
- run `WebApplication`
- open [localhost:8080](http://localhost:8080/), login with username = "user", password = {GENERATED SECURITY PASSWORD IN CONSOLE}, and you should be redirected to the default error page
