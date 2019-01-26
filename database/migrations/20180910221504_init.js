export const up = (knex, Promise) =>
  knex.schema
    .createTable('roles', (table) => {
      table.uuid('id').unique().primary().notNullable()
      table.string('name').unique().notNullable()
    })
    .createTable('users', (table) => {
      table.uuid('id').unique().primary().notNullable()
      table.string('name').notNullable()
      table.string('email').unique().notNullable()
      table.text('password').notNullable()
      table.uuid('role_id')
      table.foreign('role_id').references('id').inTable('roles')
      table.timestamps()
    })

export const down = (knex, Promise) =>
  knex.schema
    .dropTableIfExists('users')
    .dropTableIfExists('roles')
