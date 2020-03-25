export const seed = async (knex, Promise) => {
  await knex('roles').del()
  await knex('roles').insert([{ id: 1, role: 'admin' }])
}
