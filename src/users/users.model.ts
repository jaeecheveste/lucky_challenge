import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID, } from 'class-validator';


export class UserModel implements Readonly<UserModel> {
  @ApiProperty()
  @IsUUID()
  id?: string;

  @ApiProperty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsString()
  password: string;

  constructor(id: string, username: string, password: string) {
    this.id = id;
    this.username = username;
    this.password = password;
  }
}