import { Module } from "@nestjs/common"
import { UsersModule } from "../users/users.module";
import { AuthService } from "./auth.service"
import { PassportModule } from "@nestjs/passport"
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from "./jwt.strategy";
import { ConfigService } from "@nestjs/config";


@Module({
  imports: [
    UsersModule, 
    PassportModule, 
    JwtModule.registerAsync({
      imports: [],
      useFactory: (config: ConfigService) => ({
        secret: config.get("jwt.secret"),
        signOptions: { expiresIn: config.get("jwt.expires") },
      }),
      inject: [ConfigService]
      
    })
  ],
  providers: [
    AuthService, 
    LocalStrategy,
    JwtStrategy,
  ],
  controllers: [AuthController],
})

export class AuthModule { }