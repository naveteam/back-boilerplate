export const seed = async knex => {
  await knex('roles').del()
  await knex('roles').insert([{ id: 1, role: 'admin' }])
}
