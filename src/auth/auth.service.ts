import { Injectable, NotAcceptableException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService, private jwtService: JwtService) { }
    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.usersService.getUser(username);
        if (!user) return null;
        const passwordValid = await bcrypt.compare(password, user.password)
        if (!user) {
            throw new NotAcceptableException('Could not found user');
        }
        if (user && passwordValid) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async getUserFromToken(token: string) {
      return this.jwtService.verify(token);
    }

    async login(user: any) {
        const payload = { username: user.username, sub: user._id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}