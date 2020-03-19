# ExpenseHub

An APP to control your expenses

## Details

 - Frontend Angular 8
 - Backend dotnetcore 3.1 with EF Core and SQLite

 ## Requisites for local usage

 - Node and NPM
 - Angular CLI
 - Dotnetcore SDK 3.1

## Auth

To access the app, username is **test** and password is **123**.
This user is created at API Startup. The database is ephemeral, for sake of simplicity.
If you want to keep data, add a volume for the **expense-hub-service** at docker-compose.yml file

## Startup with DockerCompose

Run

```docker-compose up -d```

The app will be running on port 80 and the API on port 3000

## Backend Manual startup

Go to expense-hub-service folder and run

```dotnet run --project ExpenseHub.Service.API```

The api will listen on port 5000

## Frontend Manual startup

Go to expense-hub-ui folder and run

```npm install```

```npm start```

The app will listen on port 4200