import { hash } from 'bcryptjs'
import request from 'supertest'
import { Connection } from 'typeorm'
import { v4 as uuid } from 'uuid'

import { app } from '@shared/infra/http/app'
import createConnection from '@shared/infra/typeorm'

let connection: Connection
let token

describe('Create Category Controller', () => {
  beforeAll(async () => {
    connection = await createConnection()
    await connection.runMigrations()

    const password = await hash('admin', 8)
    const id = uuid()

    await connection.query(`
    INSERT INTO USERS(id, name, email, password, "isAdmin", driver_license, created_at)
    values('${id}', 'admin', 'admin@rentx.com', '${password}', true, 'XXX-XXX', 'now()')
    `)

    const responseToken = await request(app).post('/sessions').send({ email: 'admin@rentx.com', password: 'admin' })
    token = responseToken.body.token
  })

  afterAll(async () => {
    await connection.dropDatabase()
    await connection.close()
  })

  it('should be able to create a new category', async () => {
    const response = await request(app)
      .post('/categories')
      .send({ description: 'Description Supertest', name: 'Category Supertest' })
      .set({ Authorization: `Bearer ${token}` })

    expect(response.status).toBe(201)
  })

  it('should not be able to create a new category with name exist', async () => {
    const response = await request(app)
      .post('/categories')
      .send({ description: 'Description Supertest', name: 'Category Supertest' })
      .set({ Authorization: `Bearer ${token}` })

    expect(response.status).toBe(400)
  })
})
