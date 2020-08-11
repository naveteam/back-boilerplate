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
