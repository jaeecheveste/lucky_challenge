import * as _ from "lodash";
import { DataSource } from "typeorm";
import config from "../../config/config";
import configDb from "../../config/config.db";

async function run() {
  const document = config();
  const dbConfig = configDb({
    ...document.db.postgres,
    entities: "src/db/entities/*.entity{.ts,.js}",
  });

  const connectionSource = new DataSource({
    migrationsTableName: dbConfig.migrationsTableName,
    type: "postgres",
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

  try {
    const startedConnection = await connectionSource.initialize();

    await startedConnection.query(`
      INSERT into country (id, name) values 
        (1, 'Argentina'), 
        (2, 'Uruguay');
    `);

    await startedConnection.query(`
      INSERT into city (id, name, country_id) values 
        (1, 'Rosario', 1), 
        (2, 'Buenos Aires', 1), 
        (3, 'Montevideo', 2);
    `);
  } catch(err) {
    console.log("error running seed");
  }
}

run();
