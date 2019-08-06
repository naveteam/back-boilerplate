export const up = knex =>
  knex.schema.createTable('users', table => {
    table
      .uuid('id')
      .unique()
      .primary()
      .notNullable()
    table.string('name').notNullable()
    table
      .string('email')
      .unique()
      .notNullable()
    table.string('password').notNullable()
    table.enum('role', ['ADMIN', 'USER'])
    table.timestamps()
  })

export const down = knex => knex.schema.dropTableIfExists('users')
