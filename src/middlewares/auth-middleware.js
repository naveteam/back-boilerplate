import jwt from 'koa-jwt'

import { ACCESS_SECRET } from 'config'
import { Unauthorized } from 'helpers'

export const getToken = ({ headers }) => {
  if (!headers.authorization) {
    throw Unauthorized('You need to submit a token')
  }

  const [bearer, token] = headers.authorization.split(' ')
  if (bearer !== 'Bearer') {
    throw Unauthorized('Invalid token')
  }

  return token
}

export const authMiddleware = jwt({
  secret: ACCESS_SECRET,
  getToken
}).unless({
  path: [
    '/v1/users/login',
    '/v1/users/signup',
    '/v1/users/forget',
    '/v1/users/reset',
    '/public'
  ]
})
