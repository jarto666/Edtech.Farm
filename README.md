# FarmManager

## How to start

### API

- Locate project file at `/api/Farm.Api`
- Use any IDE of your choice for simplicity and run `http` configuration
- OR: use `dotnet run` command in project directory
- Swagger is located at: http://localhost:5015/swagger/index.html

### Frontend

- Run sequence of commands
  - `npm i` to install packages
  - Run `ng test` to execute the unit tests via [Karma]
  - Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Things to improve

### API

- Make CORS configurable, though mostly this would be managed but Cloud provider
- Add integration tests
- Solution can be dockerized

### Frontend

- Add e2e tests
- Make sure that Staging and Production builds work as expected in expected environments
