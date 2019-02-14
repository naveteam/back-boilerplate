import User from '../../database/models/User'
import bcrypt from 'bcrypt'
import {
  BadRequest,
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

    if (!user) {
      throw new Unauthorized('Usuario não encontrado')
    }

    const isValid = await bcrypt.compare(body.password, user.attributes.password)

    if (!isValid) {
      throw new Unauthorized('Senha Incorreta')
    }

    user.attributes = generateJWT(user.toJSON())

    ctx.body = user
  }

  async index (ctx) {
    const users = await new User()
      .fetchAll({ withRelated: ['role'] })
      .catch(err => { throw new InternalServerError(err.toString()) })

    ctx.body = users
  }

  async show (ctx) {
    const user = await new User({ id: ctx.params.id })
      .fetch({ withRelated: ['role'], require: true })
      .catch(err => { throw new NotFound(err.toString()) })

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
      .save({
        name: body.name,
        email: body.email,
        password: body.password,
        role_id: body.role_id
      }, { method: 'update' })
      .catch(err => { throw new NotFound(err.toString()) })

    ctx.body = user
  }

  async destroy (ctx) {
    await new User({ id: ctx.params.id })
      .destroy()
      .catch(err => { throw new BadRequest(err.toString()) })

    ctx.body = { id: ctx.params.id }
  }
}
