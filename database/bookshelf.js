import config from './knexfile'
import { NODE_ENV } from '../src/config/env'
import Knex from 'knex'
import Bookshelf from 'bookshelf'
import BookshelfUuid from 'bookshelf-uuid'

const environment = NODE_ENV || 'development'

const knex = Knex(config[environment])
const bookshelf = Bookshelf(knex)

bookshelf.plugin(BookshelfUuid)

export default bookshelf
