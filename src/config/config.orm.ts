import { DataSource } from 'typeorm';
import config from './config';
import configDb from './config.db';

const document =  config()
const dbConfig = configDb(document.db.postgres);

const connectionSource = new DataSource({
  migrationsTableName: dbConfig.migrationsTableName,
  type: 'postgres',
  host: dbConfig.host,
  port: dbConfig.port,
  username: dbConfig.username,
  password: dbConfig.password,
  database: dbConfig.database,
  logging: false,
  synchronize: false,
  name: dbConfig.name,
  entities: dbConfig.entities,
  migrations: dbConfig.migrations,
});

export default connectionSource;
