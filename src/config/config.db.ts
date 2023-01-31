import { join } from "path"

export interface ConfigDB {
  type: string,
  host: string,
  port: number,
  username: string,
  password: string,
  database: string,
  entities: string[],
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
    entities: process.env.NODE_ENV === 'local' ? ['src/**/*.entity{.ts,.js}'] : ["dist/db/entities/*.entity{.ts,.js}"],
    migrationsTableName: 'migration',
    migrations: ["dist/db/migrations/*{.ts,.js}"],
    cli: {
      migrationsDir: 'src/db/migrations',
    },
    ssl: (configDB.mode == 'prod'),
    synchronize: false
}) 