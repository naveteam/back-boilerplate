import bookshelf, { Model } from '.'

const user = Model({
  tableName: 'users',
  hasTimestamps: true,
  uuid: true,
  toJSON: function() {
    const { password, ...user } = bookshelf.Model.prototype.toJSON.apply(
      this,
      arguments
    )

    return user
  }
})

export default user
