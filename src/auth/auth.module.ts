import { Module } from "@nestjs/common"
import { UsersModule } from "../users/users.module";
import { AuthService } from "./auth.service"
import { PassportModule } from "@nestjs/passport"
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from "./jwt.strategy";


@Module({
  imports: [
    UsersModule, 
    PassportModule, 
    JwtModule.register({
      secret: 'secretKey',
      signOptions: { expiresIn: '60s' },
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