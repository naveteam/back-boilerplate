import { baseModel } from 'models'
class Role extends baseModel {
  static get tableName() {
    return 'roles'
  }
}

export default Role
