import User from 'models/User'

export const show = ctx =>
  new User({ id: ctx.state.user.id }).fetch({ withRelated: 'role_id' })

export default {
  show
}
