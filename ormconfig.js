const rootDir = process.env.NODE_ENV === 'production' ? 'dist' : 'src'
const ssl = process.env.SSL === 'true'

const dbConfig = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  migrations: [`${rootDir}/shared/infra/typeorm/migrations/*.{js,ts}`],
  entities: [`${rootDir}/modules/**/infra/typeorm/entities/*.{js,ts}`],
  synchronize: false,
  logging: false,
  ssl,
  cli: {
    migrationsDir: ['./src/shared/infra/typeorm/migrations'],
    entitiesDir: 'src/modules/**/infra/typeorm/entities/'
  }
}

module.exports = dbConfig
