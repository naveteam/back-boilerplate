import serve from 'koa-static'
import Koa from 'koa'
import Logger from 'koa-logger'
import Cors from '@koa/cors'
import koaBody from 'koa-body'
import respond from 'koa-respond'
import mount from 'koa-mount'
import routes from '../routes'
import { jwtMiddleware } from '../middleware'
import jwt from 'koa-jwt'
import { JWT_SECRET } from './env'
import { InternalServerError } from '../utils'

const app = new Koa()

app.use(mount('/public', serve('./public')))

app.use(Logger())

app.use(
  Cors({
    origin: '*',
    allowMethods: ['GET', 'HEAD', 'PUT', 'POST', 'DELETE', 'PATCH'],
    exposeHeaders: ['X-Request-Id']
  })
)

app.use(async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    const hasCode = err.statusCode || err.status
    ctx.status = hasCode || 500
    ctx.body = hasCode ? err : new InternalServerError(err.toString())
  }
})

app.use(koaBody({ multipart: true }))

app.use(jwt({
  secret: JWT_SECRET,
  jwtMiddleware
}).unless({
  path: [
    '/v1/users/login',
    '/v1/users/signup',
    '/v1/roles',
    '/public'
  ]
}))

app.use(respond())

app.use(routes.routes())
app.use(routes.allowedMethods())

export default app
