# SPLITWISE-BACKEND

This is a simple MVP backend using node.js REST API for splitwise application
It uses `sqlite3` for data storage and `express` for API endpoint

# Get Started

## Install and Run:

With npm:

```
npm install
npm run dev
```

```
I have also hosted the app on cloud and you can access using below url
http://54.168.27.184:4000/api/users

Note: in cloud its running under port 4000 which different than local since aws is not allowing 3000 port for custom tcp
```

## Tech Stack:

Nodejs
Typescript
sqlite3
jest

<br/>

# Features

## User CRUD

- Create User
- Delete User
- Update User
- Get User
- Get Balance of User
- Get friends with transaction of User

  <br/>

## Group CRUD

- Create Group
- Delete Group
- Update Group
- Get Group
- Get Group members
- Add Group members
  <br/>

## Expense CRUD

- Create Expense
- Delete Expense
- Update Expense
- Get Expense

<br/>
This version includes a TS watcher when running the `dev` command that will pick up changes automatically. Use `npm run dev` or `yarn dev` to take advantage of this feature.

## Data Persistence

This template uses `sqlite3` in memory. The data layer can easily be changed to use postgres, ms sql server, mysql, etc if needed.

There is a default script `setupDbForDev` in the `dao.ts` file that will run to create tables, insert values, etc. Please note, I have a `DROP TABLE IF EXISTS` statement that will run automatically at runtime.

## Unit Tests

I added unit tests to this TS version of the starter as well. These tests use `jest` and there are few tests in the `/tests/` directory.

## API Endpoint postman Collection

https://api.postman.com/collections/904394-8d91389c-d53c-42f7-801c-46c3568279cb?access_key=PMAT-01HFW1AAPD3YAC653GXYA8HWQC

## Folder Structure

- src/models : This folder contains data model for each of the table of DB.
- src/repositories : This folder contains low level database interaction with the help of defined model types. There is a default script setupDbForDev in the dao.ts file that will run to create tables, insert values, etc. Please note, I have a DROP TABLE IF EXISTS statement that will run automatically at runtime
- src/controllers : These are Controller functions to get the requested data from the models.
- src/routes : This holds route for each API endpoint of the corresponding entities.
