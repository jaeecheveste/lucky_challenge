import { Injectable } from "@nestjs/common";
import { UserModel } from "src/users/users.model";
import { UserProfileRespModel } from "src/users/users.profile.model";
import { UserEntity } from "../entities/user.entity";

@Injectable()
export class UserMapper {

    toEntity(userModel: UserModel): UserEntity {
        return new UserEntity(userModel.username, userModel.password);
    }

    toUserModel(userEntity: UserEntity): UserModel {
        return new UserModel(userEntity.id, userEntity.username, userEntity.password);
    }

    plainToUserProfileModel(plain: any) : UserProfileRespModel {
      if (plain.length === 0) return null;

      const profile: UserProfileRespModel = {
        id: plain[0].id, 
        username: plain[0].username,
        name: plain[0].name,
        address: { 
          city: plain[0].city,
          street: plain[0].street,
          country: plain[0].country
        },
      }

      return profile;
    }
}