import Joi from '@hapi/joi'

import { validateSchema } from 'helpers'

const RolesValidate = {
  create: () =>
    validateSchema({
      body: {
        role: Joi.string().required()
      }
    }),

  update: () =>
    validateSchema({
      body: {
        role: Joi.string().required()
      }
    })
}

export default RolesValidate
