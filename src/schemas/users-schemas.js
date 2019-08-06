import Joi from 'joi'
import validate from 'koa-joi-validate'

const UsersValidate = {
  create: () =>
    validate({
      body: {
        name: Joi.string().required(),
        email: Joi.string()
          .email()
          .required(),
        password: Joi.string()
          .min(1)
          .max(100)
          .required(),
        role: Joi.string()
          .valid('ADMIN', 'USER')
          .required()
      }
    }),

  update: () =>
    validate({
      body: {
        name: Joi.string().required(),
        email: Joi.string()
          .email()
          .required(),
        password: Joi.string()
          .min(1)
          .max(100)
          .optional(),
        role: Joi.string()
          .valid('ADMIN', 'USER')
          .required()
      }
    })
}

export default UsersValidate
