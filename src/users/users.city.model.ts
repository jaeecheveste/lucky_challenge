import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsUUID, } from 'class-validator';


export class CityModel implements Readonly<CityModel> {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsString()
  name: string;
}