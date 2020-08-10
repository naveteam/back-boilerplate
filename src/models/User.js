import { Model } from 'objection'

import Role from './Role'
import { baseModel, modelUuid } from './index'

class User extends modelUuid(baseModel) {
  static tableName = 'users'
  static hidden = ['password']

  static relationMappings = {
    role: {
      relation: Model.BelongsToOneRelation,
      modelClass: Role,
      join: {
        from: 'users.role_id',
        to: 'roles.id'
      }
    }
  }
}

export default User
