import User from '../../database/models/User'
import bcrypt from 'bcrypt'
import {
  BadRequest,
  Deleted,
  NotFound,
  Unauthorized,
  InternalServerError,
  hashPassword,
  generateJWT
} from '../utils'

export default class Controller {
  async login (ctx) {
    const { body } = ctx.request

    const user = await new User({ email: body.email })
      .fetch({ withRelated: ['role'] })
      .catch(() => { throw new Unauthorized() })

    if (user) {
      const isValid = await bcrypt.compare(
        body.password,
        user.attributes.password
      )

      if (isValid) {
        user.attributes = generateJWT(user.toJSON())

        ctx.body = user
      } else {
        throw new Unauthorized('Unauthorized, password is invalid')
      }
    } else {
      throw new Unauthorized('Unauthorized, User not found')
    }
  }

  async index (ctx) {
    const users = await new User()
      .fetchAll({ withRelated: ['role'] })
      .catch(err => { throw new InternalServerError(err.toString()) })

    ctx.body = users
  }

  async show (ctx) {
    const user = await new User({ id: ctx.params.id })
      .fetch({ withRelated: ['role'] })
      .catch(err => { throw new NotFound(err.toString()) })

    if (!user) {
      throw new NotFound()
    }

    ctx.body = user
  }

  async create (ctx) {
    const { body } = ctx.request
    body.password = await hashPassword(body.password)

    const user = await new User({
      name: body.name,
      email: body.email,
      password: body.password,
      role_id: body.role_id
    })
      .save()
      .catch(err => { throw new BadRequest(err.toString()) })

    ctx.body = await new User({ id: user.attributes.id })
      .fetch({ withRelated: ['role'] })
      .catch(err => { throw new InternalServerError(err.toString()) })
  }

  async update (ctx) {
    const { body } = ctx.request
    if (body.password) {
      body.password = await hashPassword(body.password)
    }

    const user = await new User({ id: ctx.params.id })
      .fetch({ withRelated: ['role'] })
      .catch(err => { throw new NotFound(err.toString()) })

    if (!user) {
      throw new NotFound()
    }

    await user
      .save({
        name: body.name,
        email: body.email,
        password: body.password,
        role_id: body.role_id
      })
      .catch(err => { throw new BadRequest(err.toString()) })

    ctx.body = user
  }

  async destroy (ctx) {
    await new User({ id: ctx.params.id })
      .destroy()
      .catch(err => { throw new BadRequest(err.toString()) })

    ctx.body = new Deleted()
  }
}
