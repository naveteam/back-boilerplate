import Koa from 'koa'
import Logger from 'koa-logger'
import Cors from '@koa/cors'
import koaBody from 'koa-body'
import jwt from 'koa-jwt'

import routes from 'routes'
import getToken from 'middlewares/jwt-middleware'
import { errorHandling } from 'helpers'
import { JWT_SECRET } from 'config'
import helmet from 'koa-helmet'

const app = new Koa()

app.use(helmet())
app.use(Logger())

app.use(
  Cors({
    origin: '*',
    allowMethods: ['GET', 'HEAD', 'PUT', 'POST', 'DELETE', 'PATCH'],
    exposeHeaders: ['X-Request-Id']
  })
)

app.use(koaBody({ multipart: true }))

app.use(async (ctx, next) => {
  try {
    ctx.body = await next()
  } catch (err) {
    const errorObject = errorHandling(err)
    ctx.status = errorObject.statusCode

    ctx.body = errorObject
  }
})

app.use(
  jwt({
    secret: JWT_SECRET,
    getToken
  }).unless({
    path: ['/v1/users/login', '/v1/users/signup', '/public']
  })
)

app.use(routes.routes())
app.use(routes.allowedMethods())

export default app
