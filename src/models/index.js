import { Model, mixin } from 'objection'
import Knex from 'knex'
import guid from 'objection-guid'
import visibility from 'objection-visibility'
import { DBErrors } from 'objection-db-errors'

import knexConfig from 'database/knexfile'
import { NODE_ENV } from 'config'

const knex = Knex(knexConfig[NODE_ENV])
Model.knex(knex)

// Nome das models que não têm updated_at
const dontHaveUpdateColumn = ['Role']

const readObject = item => {
  Object.keys(item).forEach(key => {
    if (Array.isArray(key)) {
      key.forEach(itemArray => (itemArray.updated_at = new Date()))
    }
  })
  item.updated_at = new Date()
}

export const modelUuid = guid()
export class baseModel extends mixin(Model, [visibility, DBErrors]) {
  static beforeUpdate({ items, inputItems }) {
    if (items.length > 0) {
      inputItems = items.map(item => {
        if (dontHaveUpdateColumn.length > 0) {
          dontHaveUpdateColumn.map(dontHaveUpdate => {
            if (inputItems[0].constructor.name !== dontHaveUpdate) {
              readObject(item)
            }
          })
        } else readObject(item)

        return item
      })
    } else {
      if (!dontHaveUpdateColumn.includes(inputItems[0].constructor.name)) {
        inputItems[0].updated_at = new Date()
      }
    }
  }

  static query(...args) {
    return super.query(...args)
  }
}

export default { baseModel, modelUuid }
