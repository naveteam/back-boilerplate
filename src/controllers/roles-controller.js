import Role from 'models/Role'

export const index = ctx => {
  const { page = 0, pageSize = 10 } = ctx.query

  return Role.query().page(page, pageSize)
}

export default {
  index
}
