import { v4 } from 'uuid'
import Transport from 'winston-transport'
import { Pool } from 'pg'

import { DATABASE } from '../config'

export class PostgresTransport extends Transport {
  className = this.constructor.name
  pool = null
  tableName = null

  constructor(pool, opts) {
    super(opts)
    this.pool = pool
    this.tableName = opts.tableName
    this.log = this.log.bind(this)
  }

  async log(info, callback) {
    const sql = `INSERT INTO ${this.tableName} (id, level, message, meta, timestamp) VALUES ($1,$2,$3,$4,$5);`
    let client

    try {
      client = await this.pool.connect()
      await client.query(sql, [
        v4(),
        info.level,
        info.message,
        info.req,
        new Date()
      ])
      callback()
    } catch (err) {
      console.log(
        `${this.className}.log(${JSON.stringify(info)}): Falure to Log: ${
          err.message
        }`
      )
    } finally {
      if (client) {
        client.release()
      }
    }
  }
}

export const createTransporterPostgres = () => {
  const [user, passwordWithRemainingString, portWithRemaining] = DATABASE.split(
    '//'
  )[1].split(':')

  const [port, database] = portWithRemaining.split('/')

  const [password, host] = passwordWithRemainingString.split('@')

  const pool = new Pool({
    host,
    port,
    user,
    password,
    database
  })

  const opts = {
    level: 'info',
    tableName: 'logs'
  }

  return new PostgresTransport(pool, opts)
}
