import Joi from '@hapi/joi'

import { validateSchema } from 'helpers'

const UsersValidate = {
  create: () =>
    validateSchema({
      body: {
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(1).max(100).required(),
        role_id: Joi.number().required()
      }
    }),

  update: () =>
    validateSchema({
      body: {
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(1).max(100).optional(),
        role_id: Joi.number().required()
      }
    })
}

export default UsersValidate
