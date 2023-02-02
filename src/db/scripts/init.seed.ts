import * as _ from "lodash";
import { CountryEntity } from "../entities/country.entity";
import { CityEntity } from "../entities/city.entity";
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
    const countries: CountryEntity[] = [
      { id: 1, name: "ARGENTINA" },
      { id: 2, name: "URUGUAY" },
    ];

    const cities: CityEntity[] = [
      { id: 1, name: "ROSARIO", countryID: 1 },
      { id: 2, name: "BUENOS AIRES", countryID: 1 },
      { id: 3, name: "MONTEVIDEO", countryID: 2 },
    ];

    const startedConnection = await connectionSource.initialize();

    const countryRepository = await startedConnection.getRepository(
      CountryEntity
    );
    const cityRepository = await startedConnection.getRepository(CityEntity);

    await countries.map(async (c: CountryEntity) => {
      try {
        const created = await countryRepository.save(c);
        console.log("Country Created", created.id);
      } catch (err) {
        console.log("Error running seed", err);
      }
    });

    await cities.map(async (c: CityEntity) => {
      try {
        const created = await cityRepository.save(c);
        console.log("City Created", created.id);
      } catch (err) {
        console.log("Error running seed", err);
      }
    });
  } catch (err) {
    console.log("Error running seed", err);
  }
}

run();
