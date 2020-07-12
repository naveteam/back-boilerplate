import User from 'models/User'

export const show = ctx => User.query().findOne({ id: ctx.state.user.id })

export default {
  show
}
