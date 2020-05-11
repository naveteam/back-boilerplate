import bookshelf, { Model } from 'models'
import role from 'models/Role'

const user = Model({
  tableName: 'users',
  uuid: true,
  toJSON: function() {
    const { password, ...user } = bookshelf.Model.prototype.toJSON.apply(
      this,
      arguments
    )
    return user
  },
  role: function() {
    return this.belongsTo(role, 'role')
  }
})

export default user
