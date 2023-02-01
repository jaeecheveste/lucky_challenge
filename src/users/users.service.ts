import { ConflictException, Injectable } from '@nestjs/common';
import { UserRepository } from 'src/db/repositories/user.repository';
import CryptoUtils from 'src/common/utils/crypto';
import { UserProfileModel, UserProfileRespModel } from './users.profile.model';
import { AddressRepository } from 'src/db/repositories/address.repository';
import { CacheService } from 'src/cache/cache.service';

@Injectable()
export class UsersService {
  constructor(private readonly cacheService: CacheService,
    private readonly repo: UserRepository, private readonly addressRepo: AddressRepository) { }

  public async getUser(username: string) {
    return await this.repo.getUser(username);
  }

  public async getUserProfile(username: string): Promise<UserProfileRespModel> {
    try {
      const cachedUser = await this.cacheService.getKey(username);
      if (cachedUser) return JSON.parse(cachedUser);

      const userProfile = await this.repo.getUserProfile(username);
      if(userProfile) await this.cacheService.setKey(username, userProfile);

      return userProfile;
    } catch (err) {
      //handle redis failing
    }
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