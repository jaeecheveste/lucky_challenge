import { ConflictException, Injectable } from '@nestjs/common';
import { UserRepository } from 'src/db/repositories/user.repository';
import CryptoUtils from 'src/common/utils/crypto';
import { UserProfileModel } from './users.profile.model';
import { AddressRepository } from 'src/db/repositories/address.repository';

@Injectable()
export class UsersService {
  constructor(private readonly repo: UserRepository, private readonly addressRepo: AddressRepository) { }

  public async getUser(username: string) {
    return await this.repo.getUser(username);
  }

  public async getUserProfile(username: string) {
    return await this.repo.getUserProfile(username);
  }

  public async createUserProfile(user: UserProfileModel) : Promise<string> {
    try {
      const userDB = await this.getUser(user.username);
      if (userDB) {
        throw new ConflictException("Username already exists");
      }
      //Add cityID validation
      const city = await this.addressRepo.getCityByID(user.cityID);
      if (!city) {
        throw new ConflictException("CityID does not exist");
      }

      const hashedPassword = await CryptoUtils.Hash(user.password);      
      return await this.repo.createProfile({ ...user, password: hashedPassword });
    } catch (err) {
      //Logger
      throw err;
    }
    
  }
}