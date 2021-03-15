import Joi from '@hapi/joi'

import { validationMiddleware } from 'middlewares'

const VALID_SORT_OPTIONS = ['name', 'created_at']

const VALID_ORDER_BY_OPTIONS = ['asc', 'desc', 'ASC', 'DESC']

const UsersValidate = {
  index: () =>
    validationMiddleware({
      query: {
        page: Joi.number(),
        pageSize: Joi.number(),
        email: Joi.string(),
        name: Joi.string(),
        role: Joi.array().items(Joi.number()).single(),
        created_at: Joi.string(),
        sort: Joi.string().valid(...VALID_SORT_OPTIONS),
        order: Joi.string().valid(...VALID_ORDER_BY_OPTIONS)
      }
    }),

  create: () =>
    validationMiddleware({
      body: {
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(1).max(100).required(),
        role_id: Joi.number().required(),
        birthdate: Joi.date().required()
      }
    }),

  update: () =>
    validationMiddleware({
      body: {
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(1).max(100).optional(),
        role_id: Joi.number().required(),
        birthdate: Joi.date().required()
      }
    }),

  refreshToken: () =>
    validationMiddleware({
      body: {
        refresh_token: Joi.string().required()
      }
    })
}

export default UsersValidate
