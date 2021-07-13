import { REDIS_HOST, REDIS_PORT } from 'config'

import { env } from 'helpers/env'

export const redisConfig = {
  host: env(REDIS_HOST, 'localhost'),
  port: env(REDIS_PORT, 6379)
}
