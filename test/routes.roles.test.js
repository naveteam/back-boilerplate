/* eslint-env jest */
import app from '../src/config/server'
import request from 'supertest'
import { Database } from '../src/utils'
import UserFactory from './factory/user-factory'
import RoleFactory from './factory/role-factory'

let server
let user
let role
const knex = new Database()

describe('TEST ROLES', () => {
  beforeEach(async () => {
    await knex.create()
    server = app.listen()
    user = await UserFactory()
    role = await RoleFactory()
  })

  afterEach(async () => {
    await knex.destroy()
    server.close()
  })

  describe('POST /v1/roles', () => {
    test('should create a new role', async () => {
      const response = await request(server)
        .post('/v1/roles')
        .send({ name: 'TestRole' })
        .set('Authorization', user.token)
      expect(response.status).toEqual(200)
      expect(response.type).toEqual('application/json')
      expect(Object.keys(response.body)).toEqual(
        expect.arrayContaining(['id', 'name'])
      )
    })
  })

  describe('GET /v1/roles', () => {
    test('should return a list of roles', async () => {
      const response = await request(server)
        .get('/v1/roles')
        .set('Authorization', user.token)
      expect(response.status).toEqual(200)
      expect(response.type).toEqual('application/json')
      expect(Object.keys(response.body[0])).toEqual(
        expect.arrayContaining(['id', 'name'])
      )
    })
  })

  describe('GET /v1/roles/:id', () => {
    test('should return a role', async () => {
      const response = await request(server)
        .get(`/v1/roles/${role.id}`)
        .set('Authorization', user.token)
      expect(response.status).toEqual(200)
      expect(response.type).toEqual('application/json')
      expect(Object.keys(response.body)).toEqual(
        expect.arrayContaining(['id', 'name'])
      )
    })
  })

  describe('PUT /v1/roles/:id', () => {
    test('should update a role', async () => {
      const response = await request(server)
        .put(`/v1/roles/${role.id}`)
        .set('Authorization', user.token)
        .send({ name: 'UpdateTestRole' })
      expect(response.status).toEqual(200)
      expect(response.type).toEqual('application/json')
      expect(Object.keys(response.body)).toEqual(
        expect.arrayContaining(['id', 'name'])
      )
    })
  })

  describe('DELETE /v1/roles/:id', async () => {
    test('should delete a role', async () => {
      const response = await request(server)
        .delete(`/v1/roles/${role.id}`)
        .set('Authorization', user.token)
      expect(response.status).toEqual(200)
      expect(response.type).toEqual('application/json')
      expect(Object.keys(response.body)).toEqual(
        expect.arrayContaining([
          'id'
        ])
      )
    })
  })
})
