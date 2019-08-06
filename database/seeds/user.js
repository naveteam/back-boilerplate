import uuidv4 from 'uuid/v4'

import { encryptPassword } from '../../src/helpers'

export const seed = async knex => {
  await knex('users').del()
  await knex('users').insert([
    {
      id: uuidv4(),
      name: 'Gustavo Pinho',
      email: 'gustavo@nave.rs',
      password: await encryptPassword('teste1'),
      role: 'ADMIN',
      created_at: new Date(),
      updated_at: new Date()
    }
  ])
}
