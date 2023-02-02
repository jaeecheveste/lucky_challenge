import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';


export class LoginModel implements Readonly<LoginModel> {
  @ApiProperty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsString()
  password: string;
}

export class LoginRespModel implements Readonly<LoginRespModel> {
  @ApiProperty()
  @IsString()
  access_token: string;
}