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
