import { baseModel } from './index'
class Role extends baseModel {
  static get tableName() {
    return 'roles'
  }
}

export default Role
