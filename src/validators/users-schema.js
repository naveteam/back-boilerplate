import Joi from '@hapi/joi'

import { validationMiddleware } from 'middlewares'

const UsersValidate = {
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
