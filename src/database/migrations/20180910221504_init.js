export const up = knex =>
  knex.schema
    .createTable('roles', table => {
      table
        .increments('id')
        .unique()
        .notNullable()
        .primary()
      table.string('role').notNullable()
    })
    .createTable('users', table => {
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
      table.integer('role').unsigned()
      table
        .foreign('role')
        .references('id')
        .inTable('roles')
        .onDelete('CASCADE')
      table.timestamps(true, true)
    })

export const down = knex =>
  knex.schema.dropTableIfExists('users').dropTableIfExists('roles')
