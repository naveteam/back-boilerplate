export const up = knex =>
  knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS CITEXT')
    .raw(
      `CREATE OR REPLACE FUNCTION update_updated_at_column() 
      RETURNS TRIGGER AS $$
      BEGIN 
        NEW.updated_at = now(); 
        RETURN NEW; 
      END;
      $$ language 'plpgsql';`
    )
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
      table.date('birthdate').notNullable()
      table.integer('role_id').unsigned()
      table
        .foreign('role_id')
        .references('id')
        .inTable('roles')
        .onDelete('CASCADE')
      table.timestamps(true, true)
    })
    .createTable('logs', table => {
      table.uuid('id').primary()
      table.string('level')
      table.string('message')
      table.json('meta')
      table.timestamp('timestamp', { useTz: true }).defaultTo(knex.fn.now())
    })
    .raw(
      `CREATE TRIGGER update_users_updated_at BEFORE UPDATE 
      ON users FOR EACH ROW EXECUTE PROCEDURE
      update_updated_at_column();`
    )

export const down = knex =>
  knex.schema
    .dropTableIfExists('users')
    .dropTableIfExists('roles')
    .dropTableIfExists('logs')
