import Knex from 'knex'
import Bookshelf from 'bookshelf'
import BookshelfUuid from 'bookshelf-uuid'

import knexConfig from 'database/knexfile'
import { NODE_ENV } from 'config'
import { InternalServerError, NotFound, BadRequest, Deleted } from 'helpers'

const knex = Knex(knexConfig[NODE_ENV])
const bookshelf = Bookshelf(knex)

bookshelf.plugin(BookshelfUuid)

export const Model = modelParams =>
  bookshelf.Model.extend({
    fetchAll: function() {
      return bookshelf.Model.prototype.fetchAll
        .apply(this, arguments)
        .catch(err => {
          throw InternalServerError(err.toString())
        })
    },
    fetch: async function() {
      return bookshelf.Model.prototype.fetch
        .apply(this, arguments)
        .catch(err => {
          throw NotFound(err.toString())
        })
    },
    save: function() {
      return bookshelf.Model.prototype.save
        .apply(this, arguments)
        .catch(err => {
          throw BadRequest(err.toString())
        })
    },
    destroy: async function() {
      await bookshelf.Model.prototype.destroy
        .apply(this, arguments)
        .catch(err => {
          throw NotFound(err.toString())
        })

      return Deleted()
    },
    ...modelParams
  })

export default bookshelf
