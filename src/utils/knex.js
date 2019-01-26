import config from '../../database/knexfile'
import Knex from 'knex'

const environment = process.env.NODE_ENV || 'test'
const knex = Knex(config[environment])

export default class Database {
  async create () {
    await knex.migrate.latest()
  }

  async destroy () {
    await knex.migrate.rollback()
  }
}
