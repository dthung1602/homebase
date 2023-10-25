### Project structure

`userservice`: The express.js app running the user service
  - `src`
    - `api`: controllers
    - `bin`: app entrypoints (web server, command-line)
    - `models`: database and models
    - `services`: app business logic
  - `tests`: contain test files

`webapp`: The django webserver
  - `webapp`: the webapp root config
  - `product`: product app
  - `user`: user app, responsible for authentication using `userservice`

### How to start

1. Prerequisites: docker and docker-compose is installed
2. In `userservice`, copy `.env.example` to `.env`
2. Run `docker-compose up`
3. The user service is available at `localhost:3000`
4. The django webapp is available at `localhost:8000`
5. Create first superuser using `userservice`: 
   Make the first HTTP request in file `userservice/sample-api-requests.http`
6. The django admin page is at `http://localhost:8000/admin/`

### Compromises

Due to time constraint, some corners were cut:
- Only some unit tests were written
- Need to config `jest` to work with es6 modules
- `userservice` only handles authentication, leaving the authorization part for the django `webapp`.
  Passing `permisson_codes` around is not ideal, but it is quick to implement
- When changing user password, we should ask for the current password
- The user listing api only supports simple pagination, no filtering or searching 
