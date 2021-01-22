# The Love Team Web Application Backend

## Project Setup

### Selected dependencies from Spring Boot (already added in pom.xml)

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

- DevTool: [how to](https://stackoverflow.com/a/46630517/14973616)
- Install lombok plugin: [instruction](https://projectlombok.org/setup/intellij)
- Reformat on save, in settings:
  1. check "Activate save actions on save"
  2. check "Reformat file"

### Database setup

- install local [PostgreSQL](https://www.postgresql.org/download/) or setup AWS RDS with PostgresSQL
- add system environment variable: tlt_jdbcurl, tlt_dbuser, tlt_dbpasswd, tlt_jwt_secret_key (secret key for generating JWT tokens)

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
- `GET` request to `/hello` should return `"Hello, this is The Love Team."`.
- `POST` request to `/hello` with JSON body `{"username": "TLT", "message": "hello, this is TLT"}` should return JSON `{"response": "Received from TLT: hello, this is TLT"}`.
