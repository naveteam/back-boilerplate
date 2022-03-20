# Node API boilerplate by nave.rs

A boilerplate for building RESTful APIs using Node.js, PostgreSQL, koa, knex, objection.

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

7. Install [Docker](https://docs.docker.com/engine/install/)

- Pull redis: `docker pull redis`
- Create image: `docker run --name your-image-name -d redis`
- Start redis: `docker start your-image-name`

8. Run `yarn start` or `yarn dev` to start server

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

## Postman

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/d40fb1d355b62a4639d3)

## Styleguide

[![Standard - JavaScript Style Guide](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

## Nodemailer

To use the nodemailer helper in a non-production environment, you need to set the variable in .env `ALLOW_LIST` and assign an array with the domains allowed for sending e-mail. This domain must start with an `@`, followed by a minimum of 2 characters, a `.` and 2 characters in the end.
In case the informed email is not part of any informed domain, the email will not be sent.

### Examples:

- ALLOW_LIST=["@nave.rs"]
- EMAIL_1: gustavo@nave.rs - `ALLOWED`
- EMAIL_2: gcdpinho@gmail.com - `NOT ALLOWED`

The following domains: `nave.rs` and`@nave` are not allowed as they do not satisfy the domain description, given above.

## Database

This project uses objection.js as ORM and knex as query builder.

### Migrations:

In order not to use before update hooks on our models, we decided to create a function and trigger via migration, everytime you create a table with updated_at add the trigger to it. (an example is in the file: "src/database/migrations/20180910221504_init.js")

## Steps to use Queue UI

1. After adding a new queue, need to add in queue.js a new `adapter`
2. Acess UI on http://localhost:3001/v1/queues/dashboards
