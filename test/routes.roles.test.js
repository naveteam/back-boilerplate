import request from 'supertest'
import app from 'server'
import { DatabaseTest } from 'helpers'
import RoleFactory from 'test/factories/roles-factory'

describe('TEST ROLES', () => {
  beforeEach(async () => {
    await DatabaseTest.createDB()
    global.server = app.listen()
    global.role = await RoleFactory()
  })

  afterEach(async () => {
    await DatabaseTest.destroyDB()
    global.server.close()
  })

  describe('POST /v1/roles', () => {
    test('should create a new role', async () => {
      const response = await request(global.server)
        .post('/v1/roles/create')
        .send({
          role: 'Role Test'
        })
      expect(response.status).toEqual(200)
      expect(response.type).toEqual('application/json')
      expect(Object.keys(response.body)).toEqual(
        expect.arrayContaining(['id', 'role'])
      )
    })
  })

  describe('GET /v1/roles', () => {
    test('should return a list of roles', async () => {
      const response = await request(global.server).get('/v1/roles')
      expect(response.status).toEqual(200)
      expect(response.type).toEqual('application/json')
      expect(Object.keys(response.body[0])).toEqual(
        expect.arrayContaining(['id', 'role'])
      )
    })
  })

  describe('GET /v1/roles/:id', () => {
    test('should return a role', async () => {
      const response = await request(global.server).get(
        `/v1/roles/${global.role.id}`
      )
      expect(response.status).toEqual(200)
      expect(response.type).toEqual('application/json')
      expect(Object.keys(response.body)).toEqual(
        expect.arrayContaining(['id', 'role'])
      )
    })
  })

  describe('PUT /v1/roles/:id', () => {
    test('should update a role', async () => {
      const response = await request(global.server)
        .put(`/v1/roles/${global.role.id}`)
        .send({
          role: 'Role Test Update'
        })
      expect(response.status).toEqual(200)
      expect(response.type).toEqual('application/json')
      expect(Object.keys(response.body)).toEqual(
        expect.arrayContaining(['id', 'role'])
      )
    })
  })

  describe('DELETE /v1/roles/:id', async () => {
    test('should delete a role', async () => {
      const response = await request(global.server).delete(
        `/v1/roles/${global.role.id}`
      )
      expect(response.status).toEqual(200)
      expect(response.type).toEqual('application/json')
      expect(Object.keys(response.body)).toEqual(
        expect.arrayContaining([
          'name',
          'message',
          'deleted',
          'statusCode',
          'errorCode'
        ])
      )
    })
  })
})
