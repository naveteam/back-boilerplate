import Joi from 'joi'
import validate from 'koa-joi-validate'

export default class Validate {
  create () {
    return validate({
      body: {
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(1).max(100).required(),
        role_id: Joi.string().guid().required()
      }
    })
  }

  update () {
    return validate({
      body: {
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(1).max(100).optional(),
        role_id: Joi.string().guid().required()
      }
    })
  }
}
