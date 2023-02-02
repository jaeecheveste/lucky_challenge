export interface ConfigDB {
  type: string,
  host: string,
  port: number,
  username: string,
  password: string,
  database: string,
  entities: string,
  migrations: string,
  migrationsTableName: string,
  cli: {
    migrationsDir: string
  },
  ssl: boolean,
  mode: string,
  name: string,
}

export default (configDB: ConfigDB) => ({
    type: 'postgres',
    name: configDB.name,
    host: configDB.host,
    port: +configDB.port,
    username: configDB.username,
    password: configDB.password,
    database: configDB.database,
    entities: [configDB.entities],
    migrationsTableName: 'migration',
    migrations: [configDB.migrations],
    cli: {
      migrationsDir: 'src/db/migrations',
    },
    ssl: (configDB.mode == 'prod'),
    synchronize: false
}) 