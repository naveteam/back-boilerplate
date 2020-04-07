# Node API boilerplate by nave.rs
A boilerplate for building RESTful APIs using Node.js, PostgreSQL, koa, knex, bookshelf.

# Getting started

## Installation

1. Install [Node.JS](https://nodejs.org/en/) LTS version
2. Install PostgreSQL
3. Clone this repository and enter on the respective folder
4. Install dependencies running: `yarn` or `npm install`

## Things to do before run the project:

1. Create database (by follow the commands):
  - CREATE USER `user` WITH PASSWORD `password`
  - CREATE DATABASE `database`
  - GRANT ALL PRIVILEGES ON DATABASE `database` to `user`
2. Install `citext` extension on your database with the command `CREATE EXTENSION citext;`
3. Change name value of .env.example to .env and set the key SECRET to any value you wish
4. Change DATABASE_URL to postgress://`user`:`password`@`localhost`/`database`
5. Run migrations: `yarn db:migrate`
6. Run seeds: `yarn db:seed`
7. Run `yarn start` or `yarn dev` to start server

## Testing

1. Run tests: `yarn test`

## Directory Structure

```
├── /src
|   ├── /controllers
|   ├── /database
|   |    ├── /migrations
|   |    ├── /seeds
|   ├── /helpers
|   ├── /middleware
|   ├── /models
|   ├── /routes
|   ├── /validators
├── /test
```

## Insomnia

[![Run in Insomnia](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=Back%20Boilerplate%20Nave.rs&uri=https%3A%2F%2Fraw.githubusercontent.com%2Fnaveteam%2Fback-boilerplate%2Fmaster%2Finsomnia.json)

## Styleguide

[![Standard - JavaScript Style Guide](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)
