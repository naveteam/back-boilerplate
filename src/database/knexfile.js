import path from 'path'

import { DATABASE, DATABASE_TEST } from '../config'

export const development = {
  client: 'pg',
  connection: DATABASE,
  migrations: {
    directory: path.resolve(__dirname, 'migrations')
  }
}

export const production = {
  client: 'pg',
  connection: DATABASE,
  migrations: {
    directory: path.resolve(__dirname, 'migrations')
  }
}

export const test = {
  client: 'pg',
  connection: DATABASE_TEST,
  migrations: {
    directory: path.resolve(__dirname, 'migrations')
  }
}

const knex = {
  development,
  production,
  test
}

export default knex
