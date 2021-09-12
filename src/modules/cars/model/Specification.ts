import { v4 as uuid } from 'uuid'

class Specification {
  description: string
  created_at: Date
  name: string
  id?: string

  constructor() {
    if (!this.id) this.id = uuid()
  }
}

export { Specification }
