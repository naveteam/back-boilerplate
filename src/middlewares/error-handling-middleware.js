import { errorHandling } from 'helpers'

export const errorHandlingMiddleware = async (ctx, next) => {
  try {
    ctx.body = await next()
  } catch (err) {
    const errorObject = errorHandling(err)
    ctx.status = errorObject.statusCode
    ctx.body = errorObject
  }
}
