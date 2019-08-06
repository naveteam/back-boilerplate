import User from '../models/User'
import bcrypt from 'bcrypt'
import { Unauthorized, encryptPassword, generateJWTToken } from '../helpers'

const UsersController = {
  login: async ctx => {
    const { body } = ctx.request

    const user = await new User({ email: body.email }).fetch().catch(() => {
      throw Unauthorized('Unauthorized, User not found')
    })

    const isValid = await bcrypt.compare(
      body.password,
      user.attributes.password
    )

    if (!isValid) {
      throw Unauthorized('Unauthorized, password is invalid')
    }

    ctx.body = {
      ...user.toJSON(),
      token: generateJWTToken(user.attributes)
    }
  },

  index: async ctx => (ctx.body = await new User().fetchAll()),

  show: async ctx =>
    (ctx.body = await new User({ id: ctx.params.id }).fetch({
      require: true
    })),

  create: async ctx => {
    const { body } = ctx.request

    const user = await new User({
      name: body.name,
      email: body.email,
      password: await encryptPassword(body.password),
      role: body.role
    }).save()

    ctx.body = await new User({ id: user.attributes.id }).fetch()
  },

  update: async ctx => {
    const { body } = ctx.request

    await new User({ id: ctx.params.id }).save(
      {
        name: body.name,
        email: body.email,
        password: await encryptPassword(body.password),
        role: body.role
      },
      { method: 'update' }
    )

    ctx.body = await new User({ id: ctx.params.id }).fetch()
  },

  destroy: async ctx =>
    (ctx.body = await new User({ id: ctx.params.id }).destroy())
}

export default UsersController
