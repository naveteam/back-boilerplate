import Koa from 'koa'
import Logger from 'koa-logger'
import Cors from '@koa/cors'
import koaBody from 'koa-body'
import helmet from 'koa-helmet'
import { logger } from 'koa2-winston'
import * as winston from 'winston'

import routes from 'routes'
import { authMiddleware, errorHandlingMiddleware } from 'middlewares'
import { createCloudwatchTransporter, createTransporterPostgres } from 'helpers'
import { LOGGER_GROUP, LOGGER_STREAM_GENERAL } from './utils'

const app = new Koa()

app.use(helmet())

app.use(
  logger({
    transports: [
      createTransporterPostgres(),
      new winston.transports.Console({ simple: true, colorize: true }),
      new winston.transports.Console({ simple: true, json: true })
    ],

    reqKeys: [
      'header',
      'url',
      'method',
      'httpVersion',
      'href',
      'query',
      'length',
      'body'
    ],
    reqSelect: [],
    reqUnselect: ['header.cookie', 'header.authorization', 'body.password'],
    resKeys: ['header', 'status'],
    resSelect: [],
    resUnselect: []
  })
)

app.use(
  Cors({
    origin: '*',
    allowMethods: ['GET', 'HEAD', 'PUT', 'POST', 'DELETE', 'PATCH'],
    exposeHeaders: ['X-Request-Id']
  })
)

app.use(koaBody({ multipart: true }))

app.use(errorHandlingMiddleware)

app.use(authMiddleware)

app.use(routes.routes())
app.use(routes.allowedMethods())

export default app
