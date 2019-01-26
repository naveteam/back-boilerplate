import Role from '../../database/models/Role'
import { stringGenerator } from '../../src/utils'

export default async () => {
  const role = await new Role({
    name: stringGenerator()
  }).save()

  return role.toJSON()
}
