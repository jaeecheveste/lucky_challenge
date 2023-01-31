// item.service.ts 

import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/db/entities/user.entity';
import { UserModel } from 'src/users/users.model';
import { UserProfileModel, UserProfileRespModel } from 'src/users/users.profile.model';
import { DataSource, QueryRunner, Repository } from 'typeorm';
import { AddressEntity } from '../entities/address.entity';
import { UserMapper } from '../mappers/user.mappers';
import { TransactionProvider } from '../providers/transaction.provider';

@Injectable()
export class UserRepository {
  constructor(
    @InjectDataSource() private readonly dataSource: DataSource,
    @InjectRepository(UserEntity) private repo: Repository<UserEntity>,
    @InjectRepository(AddressEntity) private addressRepo: Repository<AddressEntity>,
    private transactionProvider: TransactionProvider,
    private mapper: UserMapper) { }

  public async getUser(username: string): Promise<UserModel> {
    return await this.repo.findOne({ where: { username } });
  }

  public async getUserProfile(username: string): Promise<UserProfileRespModel> {
    try {
      const query = `
        SELECT p.id,  p.name, u.username, a.street, ci.name as city, c.name AS country
        from "profile" p
        inner join "user" u on u.id = p.user_id
        inner join "address" a on a.id = p.address_id
        inner join "city" ci on ci.id = a.city_id
        inner join "country" c on c.id = ci.country_id
        where u.username = '${username}'
      `;
      const plainResult = await this.dataSource.query(query);

      return this.mapper.plainToUserProfileModel(plainResult);
    } catch (err) {
      throw err;
    }
  }

  public async createProfile(user: UserProfileModel): Promise<string> {
    try {

      const transactionQFn = async (trx: QueryRunner) => {
        const insertUser = `INSERT INTO "user" (username, "password") VALUES ('${user.username}', '${user.password}') RETURNING ID;`;
        const userCreated = await trx.query(insertUser);
    
        const address = await this.addressRepo.findOne({ where: { street: user.address, cityID: user.cityID }})

        let addressID;
        if (!address) {
          const insertAddress = `INSERT INTO "address"(street, city_id) VALUES ('${user.address}', ${user.cityID}) RETURNING ID;`;
          const address = await trx.query(insertAddress);
          addressID = address[0].id;
        }

        const insertProfile = `INSERT INTO "profile"(user_id, address_id, name) VALUES ('${userCreated[0].id}', ${addressID}, '${user.name}');`;

        await trx.query(insertProfile);
      }

      await this.transactionProvider.executeTransaction(transactionQFn);
      return `Profile Created Successfully for username: ${user.username}`;
    } catch (err) {
       throw err;
    }
  }
}