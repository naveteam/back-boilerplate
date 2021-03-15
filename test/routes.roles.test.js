import request from 'supertest'
import app from 'server'
import { DatabaseTest } from 'helpers'
import UserFactory from 'test/factories/users-factory'
import RoleFactory from 'test/factories/role-factory'

describe('TEST ROLES', () => {
  beforeEach(async () => {
    await DatabaseTest.createDB()
    global.server = app.listen()
    await RoleFactory()
    global.user = await UserFactory()
  })

  afterEach(async () => {
    await DatabaseTest.destroyDB()
    global.server.close()
  })

  describe('GET /v1/roles', () => {
    test('should return a list of roles', async () => {
      const response = await request(global.server)
        .get('/v1/roles')
        .set('Authorization', global.user.token)

      expect(response.status).toEqual(200)
      expect(response.type).toEqual('application/json')
      expect(response.body.results[0]).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          role: expect.any(String)
        })
      )
    })
  })
})
