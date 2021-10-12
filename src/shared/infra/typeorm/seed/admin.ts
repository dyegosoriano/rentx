import { hash } from 'bcryptjs'
import { v4 as uuid } from 'uuid'

import createConnection from '../index'

async function create() {
  const connection = await createConnection('localhost')

  const password = await hash('admin', 8)
  const id = uuid()

  await connection.query(
    `INSERT INTO USERS(id, name, email, password, "isAdmin", driver_license, created_at)
      values('${id}', 'admin', 'admin@rentx.com', '${password}', true, 'XXX-XXX', 'now()')
    `
  )
}

create().then(() => console.log('User admin created!'))
