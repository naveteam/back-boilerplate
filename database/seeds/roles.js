import uuidv4 from 'uuid/v4'

export const seed = async (knex, Promise) => {
  await knex('roles').del()
  await knex('roles').insert([
    { id: uuidv4(), name: 'role' },
    { id: uuidv4(), name: 'admin' }
  ])
}
