export const up = knex =>
  knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS CITEXT')
    .createTable('roles', table => {
      table.increments('id').primary()
      table.string('role').notNullable()
    })
    .createTable('users', table => {
      table.uuid('id').primary()
      table.string('name').notNullable()
      table.specificType('email', 'CITEXT').unique().notNullable()
      table.string('password').notNullable()
      table.string('password_reset_token').unique()
      table.integer('role_id').unsigned()
      table
        .foreign('role_id')
        .references('id')
        .inTable('roles')
        .onDelete('CASCADE')
      table.timestamps(true, true)
    })

export const down = knex =>
  knex.schema.dropTableIfExists('users').dropTableIfExists('roles')
