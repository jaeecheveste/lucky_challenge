// item.service.ts 

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CityModel } from 'src/users/users.city.model';
import { Repository } from 'typeorm';
import { AddressEntity } from '../entities/address.entity';
import { CityEntity } from '../entities/city.entity';

@Injectable()
export class AddressRepository {
  constructor(
    @InjectRepository(CityEntity) private citiesRepo: Repository<CityEntity>,
    @InjectRepository(AddressEntity) private addressRepo: Repository<AddressEntity>,
   ) { }

  public async getCityByID(id: number): Promise<CityModel> {
    return await this.citiesRepo.findOne({ where: { id } });
  }

}