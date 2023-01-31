import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsObject, IsString, IsUUID, Validate, } from 'class-validator';

export class UserAddressModel {
  @ApiProperty()
  @IsString()
  street: string;

  @ApiProperty()
  @IsString()
  city: string;

  @ApiProperty()
  @IsString()
  country: string;
}

export class UserProfileModel implements Readonly<UserProfileModel> {
  @ApiProperty()
  @IsUUID()
  id?: string;

  @ApiProperty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsString()
  password?: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  address: string;

  @ApiProperty()
  @IsNumber()
  cityID: number;
}

export class UserProfileRespModel implements Readonly<UserProfileRespModel> {
  @ApiProperty()
  @IsUUID()
  id: string;

  @ApiProperty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @Validate(UserAddressModel)
  address: UserAddressModel;
}