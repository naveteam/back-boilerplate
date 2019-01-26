import Role from '../../database/models/Role'
import {
  InternalServerError,
  NotFound,
  BadRequest,
  Deleted
} from '../utils'

class Controller {
  async index (ctx) {
    const roles = await new Role()
      .fetchAll()
      .catch(err => { throw new InternalServerError(err.toString()) })

    ctx.body = roles
  }

  async show (ctx) {
    const role = await new Role({ id: ctx.params.id })
      .fetch()
      .catch(err => { throw new NotFound(err.toString()) })

    if (!role) {
      throw new NotFound()
    }

    ctx.body = role
  }

  async create (ctx) {
    const { body } = ctx.request
    const role = await new Role({
      name: body.name
    })
      .save()
      .catch(err => { throw new BadRequest(err.toString()) })

    ctx.body = role
  }

  async update (ctx) {
    const { body } = ctx.request

    const role = await new Role({ id: ctx.params.id })
      .fetch()
      .catch(err => { throw new NotFound(err.toString()) })

    if (!role) {
      throw new NotFound()
    }

    await role
      .save({
        name: body.name
      })
      .catch(err => { throw new BadRequest(err.toString()) })

    ctx.body = role
  }

  async destroy (ctx) {
    await new Role({ id: ctx.params.id })
      .destroy()
      .catch(err => { throw new NotFound(err.toString()) })

    ctx.body = new Deleted()
  }
}

export default Controller
