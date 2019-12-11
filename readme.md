# Node API boilerplate by nave.rs
A boilerplate for building RESTful APIs using Node.js, PostgreSQL, koa, knex, bookshelf. 

# Getting started

## Installation

1. Install [Node.JS](https://nodejs.org/en/download/package-manager/) latest version
2. Install PostgreSQL
2. Clone this repository
3. Install dependencies, just run in project folder: `yarn` or `npm install`

## Things to do before run the project:

1. Create database (by follow the commands):
  - CREATE USER `user` WITH PASSWORD `password`
  - CREATE DATABASE `database`
  - GRANT ALL PRIVILEGES ON DATABASE `database` to `user`
2. Change name value of .env.example to .env and set the key SECRET to any value you wish
3. Change DATABASE_URL to postgress://`user`:`password`@`localhost`/`database`
4. Run migrations: `yarn db:migrate`
5. Run seeds: `yarn db:seed`
6. Run `yarn start` or `yarn dev` to start server

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

## Styleguide

[![Standard - JavaScript Style Guide](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)
