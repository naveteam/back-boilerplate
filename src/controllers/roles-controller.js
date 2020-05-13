import Role from 'models/Role'

export const index = () => new Role().fetchAll()

export const show = ctx => new Role({ id: ctx.params.id }).fetch()

export const create = async ctx => {
  const { body } = ctx.request

  return new Role({
    role: body.role
  }).save()
}

export const update = async ctx => {
  const { body } = ctx.request

  return new Role({ id: ctx.params.id }).save(
    {
      role: body.role
    },
    { method: 'update' }
  )
}

export const destroy = ctx => new Role({ id: ctx.params.id }).destroy()

export default {
  index,
  create,
  show,
  update,
  destroy
}
