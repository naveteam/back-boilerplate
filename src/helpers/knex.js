import Knex from 'knex'

import knexConfig from 'database/knexfile'
import { NODE_ENV } from 'config'

const knex = Knex(knexConfig[NODE_ENV || 'test'])

const DatabaseTest = {
  createDB: () => knex.migrate.latest(),
  destroyDB: () => knex.migrate.rollback(null, true)
}

export default DatabaseTest
