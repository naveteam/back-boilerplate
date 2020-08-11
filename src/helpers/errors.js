import {
  DBError,
  UniqueViolationError,
  NotNullViolationError,
  ForeignKeyViolationError,
  CheckViolationError,
  DataError
} from 'objection'

export const NotFound = (
  message = 'The requested resource could not be found'
) => ({
  name: 'NotFound',
  message,
  statusCode: 404,
  errorCode: 404
})

export const BadRequest = (message = 'The json data is malformed') => ({
  name: 'BadRequest',
  message,
  statusCode: 400,
  errorCode: 400
})

export const InternalServerError = (
  message = 'The API did something wrong'
) => ({
  name: 'InternalServerError',
  message,
  statusCode: 500,
  errorCode: 500
})

export const Unauthorized = (message = 'Incorrect username or password') => ({
  name: 'Unauthorized',
  message,
  statusCode: 401,
  errorCode: 401
})

export const Deleted = (message = 'Successfully deleted') => ({
  name: 'Deleted',
  message,
  deleted: true,
  statusCode: 200,
  errorCode: 200
})

export const getErrorByStatusCode = statusCode => {
  switch (statusCode) {
    case 404:
      return NotFound
    case 400:
      return BadRequest
    case 500:
    default:
      return InternalServerError
    case 401:
      return Unauthorized
  }
}

const internalError = err => {
  if (err.errorCode) {
    return err
  }

  if (err.originalError) {
    return Unauthorized(err.originalError.message)
  }

  const errorLib = getErrorByStatusCode(err.statusCode || err.status || 500)

  return errorLib(err.message || err.toString())
}

export const errorHandling = err => {
  if (err.statusCode) {
    return internalError(err)
  }

  if (err instanceof UniqueViolationError) {
    return {
      type: err.name,
      data: {
        columns: err.columns,
        table: err.table,
        constraint: err.constraint
      },
      statusCode: 409
    }
  }
  if (err instanceof NotNullViolationError) {
    return {
      type: err.name,
      data: {
        column: err.column,
        table: err.table
      },
      statusCode: 400
    }
  }
  if (err instanceof ForeignKeyViolationError) {
    return {
      type: err.name,
      data: {
        table: err.table,
        constraint: err.constraint
      },
      statusCode: 409
    }
  }
  if (err instanceof CheckViolationError) {
    return {
      type: err.name,
      data: {
        table: err.table,
        constraint: err.constraint
      },
      statusCode: 400
    }
  }
  if (err instanceof DataError) {
    return {
      type: err.name,
      data: {},
      statusCode: 400
    }
  }
  if (err instanceof DBError) {
    return {
      type: 'UnknownDatabaseError',
      data: {
        message: err.message
      },
      statusCode: 500
    }
  }
  return {
    type: 'UnknownError',
    data: {
      message: err.message
    },
    statusCode: 500
  }
}
