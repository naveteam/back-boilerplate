/* eslint-env jest */
import app from '../src/config/server'
import request from 'supertest'
import { Database, emailGenerator } from '../src/utils'
import UserFactory from './factory/user-factory'
import RoleFactory from './factory/role-factory'

let server
let user
const knex = new Database()

describe('TEST USERS', () => {
  beforeEach(async () => {
    await knex.create()
    server = app.listen()
    user = await UserFactory()
  })

  afterEach(async () => {
    await knex.destroy()
    server.close()
  })

  describe('POST /v1/users', () => {
    test('should create a new user', async () => {
      const role = await RoleFactory()

      const response = await request(server)
        .post('/v1/users/signup')
        .send({
          name: 'User Test',
          email: emailGenerator(),
          password: 'test123',
          role_id: role.id
        })
      expect(response.status).toEqual(200)
      expect(response.type).toEqual('application/json')
      expect(Object.keys(response.body)).toEqual(
        expect.arrayContaining(['id', 'name', 'email', 'role'])
      )
    })
  })

  describe('POST /v1/users/login', () => {
    test('should do login', async () => {
      const response = await request(server)
        .post('/v1/users/login')
        .send({
          email: user.email,
          password: user.password
        })
      expect(response.status).toEqual(200)
      expect(response.type).toEqual('application/json')
      expect(Object.keys(response.body)).toEqual(
        expect.arrayContaining(['id', 'name', 'email', 'token', 'role'])
      )
    })
  })

  describe('GET /v1/users', () => {
    test('should return a list of users', async () => {
      const response = await request(server)
        .get('/v1/users')
        .set('Authorization', user.token)
      expect(response.status).toEqual(200)
      expect(response.type).toEqual('application/json')
      expect(Object.keys(response.body[0])).toEqual(
        expect.arrayContaining(['id', 'name', 'email', 'role'])
      )
    })
  })

  describe('GET /v1/users', () => {
    test('should return a user', async () => {
      const response = await request(server)
        .get(`/v1/users/${user.id}`)
        .set('Authorization', user.token)
      expect(response.status).toEqual(200)
      expect(response.type).toEqual('application/json')
      expect(Object.keys(response.body)).toEqual(
        expect.arrayContaining(['id', 'name', 'email', 'role'])
      )
    })
  })

  describe('PUT /v1/users', () => {
    test('should update a user', async () => {
      const role = await RoleFactory()
      const response = await request(server)
        .put(`/v1/users/${user.id}`)
        .set('Authorization', user.token)
        .send({
          name: 'User Test Update',
          email: emailGenerator(),
          password: 'update123',
          role_id: role.id
        })
      expect(response.status).toEqual(200)
      expect(response.type).toEqual('application/json')
      expect(Object.keys(response.body)).toEqual(
        expect.arrayContaining(['id', 'name', 'email'])
      )
    })
  })

  describe('DELETE /v1/users', async () => {
    test('should delete a user', async () => {
      const response = await request(server)
        .delete(`/v1/users/${user.id}`)
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
