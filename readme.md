# Node API boilerplate by nave.rs
A boilerplate for building RESTful APIs using Node.js, PostgreSQL, koa, knex, bookshelf. 

# Getting started

## Installation

1. Install [Node.JS](https://nodejs.org/en/download/package-manager/) latest version
2. Install PostgreSQL
2. Clone this repository
3. Install dependencies, just run in project folder: `npm install` or `yarn`

## Things to do before run the project:

1. Create database: `npm run createdb`
2. Change name value of .env.example to .env and set the key SECRET to any value you wish
3. Run migrations: `npm run knex migrate:latest`
4. Run seeds: `npm run knex seed:run`
5. Run `npm start` or `npm run dev` to start server

## Testing

1. Run tests: `npm test`

## Directory Structure

```
├── /database
|   ├── /migrations
|   ├── /models
|   ├── /scripts
|   ├── /seeds
├── /public
├── /src
|   ├── /config
|   ├── /controllers
|   ├── /middleware
|   ├── /routes
|   ├── /schemas
|   ├── /utils
├── /test
```

## Styleguide

[![Standard - JavaScript Style Guide](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)