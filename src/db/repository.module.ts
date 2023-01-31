import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UserEntity } from 'src/db/entities/user.entity';
import ORMConfig from '../config/config.db';
import { AddressEntity } from './entities/address.entity';
import { CityEntity } from './entities/city.entity';
import { CountryEntity } from './entities/country.entity';
import { ProfileEntity } from './entities/profile.entity';
import { UserMapper } from './mappers/user.mappers';
import { TransactionProvider } from './providers/transaction.provider';
import { AddressRepository } from './repositories/address.repository';
import { UserRepository } from './repositories/user.repository';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [],
      useFactory: (config: ConfigService) => ORMConfig(config.get('db.postgres')) as TypeOrmModuleOptions,
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([UserEntity, CityEntity, CountryEntity, ProfileEntity, AddressEntity]),
  ],
  providers: [
    AddressRepository,
    UserRepository,
    UserMapper,
    TransactionProvider,
  ],
  controllers: [],
  exports: [
    AddressRepository,
    UserRepository
  ]
})
export class RepositoryModule { }