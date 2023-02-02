// scripts/seed.ts
import * as _ from 'lodash';
import ConnectionDB from '../../config/config.orm'
import { CountryEntity } from '../entities/country.entity';
import { CityEntity } from '../entities/city.entity';
async function run() {

  try {
    const countries: CountryEntity[] = [
      { id: 1, name: "ARGENTINA" },
      { id: 2, name: "URUGUAY" }
    ];

    const cities:  CityEntity[] = [
      { id: 1, name: "ROSARIO", countryID: 1 },
      { id: 2, name: "BUENOS AIRES", countryID: 1 },
      { id: 3, name: "MONTEVIDEO", countryID: 2 },
    ];

    const startedConnection = await ConnectionDB.initialize();
  
    const countryRepository = await startedConnection.getRepository(CountryEntity);
    const cityRepository = await startedConnection.getRepository(CityEntity)

    countries.map(async (c: CountryEntity) => {
      try {
        const created = await countryRepository.save(c)
        console.log("Country Created", created.id);
      } catch(err) {
        console.log("Error running seed", err);
      }
    });

    cities.map(async (c: CityEntity) => {
      try {
        const created = await cityRepository.save(c)
        console.log("City Created", created.id);
      } catch(err) {
        console.log("Error running seed", err);
      }
    });

    process.exit(1);
  } catch (err) {
    console.log("Error running seed", err);
  }
}

run()