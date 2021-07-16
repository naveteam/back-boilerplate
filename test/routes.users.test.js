import request from 'supertest'
import app from 'server'
import { DatabaseTest } from 'helpers'
import UserFactory from 'test/factories/users-factory'
import RoleFactory from 'test/factories/role-factory'

jest.mock('helpers/nodemailer')

describe('TEST USERS', () => {
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

  describe('POST /v1/users', () => {
    test('should create a new user', async () => {
      const response = await request(global.server)
        .post('/v1/users/signup')
        .send({
          name: 'User Test',
          email: 'userTest@teste.com',
          password: 'test123',
          role_id: 1,
          birthdate: '1900-05-01'
        })
      expect(response.status).toEqual(200)
      expect(response.type).toEqual('application/json')
      expect(response.body).toEqual(
        expect.objectContaining({
          id: expect.any(String),
          name: expect.any(String),
          email: expect.any(String),
          role_id: expect.any(Number),
          birthdate: expect.any(String)
        })
      )
    })
  })

  describe('POST /v1/users/login', () => {
    test('should do login', async () => {
      const response = await request(global.server)
        .post('/v1/users/login')
        .send({
          email: global.user.email,
          password: global.user.password
        })
      expect(response.status).toEqual(200)
      expect(response.type).toEqual('application/json')
      expect(response.body).toEqual(
        expect.objectContaining({
          id: expect.any(String),
          name: expect.any(String),
          email: expect.any(String),
          role_id: expect.any(Number),
          access_token: expect.any(String),
          refresh_token: expect.any(String),
          birthdate: expect.any(String)
        })
      )
    })
  })

  describe('GET /v1/users', () => {
    test('should return a list of users', async () => {
      const response = await request(global.server)
        .get('/v1/users')
        .set('Authorization', global.user.token)
      expect(response.status).toEqual(200)
      expect(response.type).toEqual('application/json')
      expect(response.body.results[0]).toEqual(
        expect.objectContaining({
          id: expect.any(String),
          name: expect.any(String),
          email: expect.any(String),
          role_id: expect.any(Number),
          birthdate: expect.any(String)
        })
      )
    })
  })

  describe('GET /v1/users/:id', () => {
    test('should return a user', async () => {
      const response = await request(global.server)
        .get(`/v1/users/${global.user.id}`)
        .set('Authorization', global.user.token)
      expect(response.status).toEqual(200)
      expect(response.type).toEqual('application/json')
      expect(response.body).toEqual(
        expect.objectContaining({
          id: expect.any(String),
          name: expect.any(String),
          email: expect.any(String),
          role_id: expect.any(Number),
          birthdate: expect.any(String)
        })
      )
    })
  })

  describe('PUT /v1/users/:id', () => {
    test('should update a user', async () => {
      const response = await request(global.server)
        .put(`/v1/users/${global.user.id}`)
        .set('Authorization', global.user.token)
        .send({
          name: 'User Test Update',
          email: 'userTestUpdate@teste.com',
          password: 'update123',
          role_id: 1,
          birthdate: '1900-05-01'
        })
      expect(response.status).toEqual(200)
      expect(response.type).toEqual('application/json')
      expect(response.body).toEqual(
        expect.objectContaining({
          id: expect.any(String),
          name: expect.any(String),
          email: expect.any(String),
          role_id: expect.any(Number),
          birthdate: expect.any(String)
        })
      )
    })
  })

  describe('PUT /v1/users/refresh-token', () => {
    test('should update tokens', async () => {
      const {
        body: { refresh_token }
      } = await request(global.server).post('/v1/users/login').send({
        email: global.user.email,
        password: global.user.password
      })

      const response = await request(global.server)
        .put('/v1/users/refresh-token')
        .set('Authorization', global.user.token)
        .send({
          refresh_token
        })
      expect(response.status).toEqual(200)
      expect(response.type).toEqual('application/json')
      expect(response.body).toEqual(
        expect.objectContaining({
          access_token: expect.any(String),
          refresh_token: expect.any(String)
        })
      )
    })
  })

  describe('DELETE /v1/users/:id', () => {
    test('should delete a user', async () => {
      const response = await request(global.server)
        .delete(`/v1/users/${global.user.id}`)
        .set('Authorization', global.user.token)
      expect(response.status).toEqual(200)
      expect(response.type).toEqual('application/json')
      expect(response.body).toEqual(
        expect.objectContaining({
          id: expect.any(String),
          name: expect.any(String),
          email: expect.any(String),
          role_id: expect.any(Number),
          birthdate: expect.any(String)
        })
      )
    })
  })

  describe('POST /v1/users/queue', () => {
    test('should create a new user', async () => {
      const response = await request(global.server)
        .post('/v1/users/queue')
        .set('Authorization', global.user.token)
        .send({
          name: 'User Test',
          email: 'userTest@teste.com',
          password: 'test123',
          role_id: 1,
          birthdate: '1900-05-01'
        })
      expect(response.status).toEqual(200)
      expect(response.type).toEqual('application/json')
      expect(response.body).toEqual(
        expect.objectContaining({
          message: 'Job is running'
        })
      )
    })
  })
})
