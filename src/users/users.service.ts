import { ConflictException, Injectable, Logger } from '@nestjs/common';
import { UserRepository } from 'src/db/repositories/user.repository';
import CryptoUtils from 'src/common/utils/crypto';
import { UserProfileModel, UserProfileRespModel } from './users.profile.model';
import { AddressRepository } from 'src/db/repositories/address.repository';
import { CacheService } from 'src/cache/cache.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(private readonly cacheService: CacheService,
    private readonly configService: ConfigService,
    private readonly repo: UserRepository, private readonly addressRepo: AddressRepository) { }

  public async getUser(username: string) {
    return await this.repo.getUser(username);
  }

  public async getUserProfile(username: string): Promise<UserProfileRespModel> {
    try {

      const cachedUser = await this.cacheService.executeCacheFn(()=> {
        return this.cacheService.getKey(this.getPrefixedUserKey(username))
      })

      if (cachedUser) {
        this.logger.log("Retrieved user from cached", username)
        return JSON.parse(cachedUser);
      }

      const userProfile = await this.repo.getUserProfile(username);
      if(userProfile) await this.cacheService.setKey(this.getPrefixedUserKey(username), userProfile);

      return userProfile;
    } catch (err) {
      this.logger.error(`Error geting user profile [username]=${username}`);
      throw err;
    }
  }

  public async createUserProfile(user: UserProfileModel) : Promise<string> {
    try {
      const userDB = await this.getUser(user.username);
      if (userDB) {
        throw new ConflictException("Username already exists");
      }

      const cachedCity = await this.cacheService.executeCacheFn(()=> {
        this.cacheService.getKey(this.getPrefixedCityKey(user.cityID))
      })

      if (!cachedCity) {
        const city = await this.addressRepo.getCityByID(user.cityID);
        if (!city) {
          throw new ConflictException("CityID does not exist");
        }
        await this.cacheService.setKey(this.getPrefixedCityKey(city.id), 1);
      } else {
        this.logger.log(`Retrieved city from cache [city]=${cachedCity}`)
      }

      const hashedPassword = await CryptoUtils.Hash(user.password);      
      return await this.repo.createProfile({ ...user, password: hashedPassword });
    } catch (err) {
      this.logger.error(`Error creating user profile [err]=${JSON.stringify(err)}`);
      throw err;
    }
    
  }

  getPrefixedCityKey(id: number): string {
    return `${this.configService.get('cache.city')}:${id}`;
  }

  getPrefixedUserKey(username: string): string {
    return `${this.configService.get('cache.user')}:${username}`;
  }
}