import Joi from '@hapi/joi'

import { validateSchema } from 'helpers'

const UsersValidate = {
  create: () =>
    validateSchema({
      body: {
        name: Joi.string().required(),
        email: Joi.string()
          .email()
          .required(),
        password: Joi.string()
          .min(1)
          .max(100)
          .required(),
        role: Joi.number().required()
      }
    }),

  update: () =>
    validateSchema({
      body: {
        name: Joi.string().required(),
        email: Joi.string()
          .email()
          .required(),
        password: Joi.string()
          .min(1)
          .max(100)
          .optional(),
        role: Joi.number().required()
      }
    })
}

export default UsersValidate
