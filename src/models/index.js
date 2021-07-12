import { Model, mixin } from 'objection'
import Knex from 'knex'
import guid from 'objection-guid'
import visibility from 'objection-visibility'
import { DBErrors } from 'objection-db-errors'

import knexConfig from 'database/knexfile'
import { NODE_ENV } from 'config'

const knex = Knex(knexConfig[NODE_ENV])
Model.knex(knex)

export const modelUuid = guid()
export class baseModel extends mixin(Model, [visibility, DBErrors]) {
  static get modelPaths() {
    return [__dirname]
  }

  static query(...args) {
    return super.query(...args)
  }
}

export default { baseModel, modelUuid }
