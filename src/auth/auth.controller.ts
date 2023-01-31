import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './local.auth.guard';
import { JwtAuthGuard } from './jwt.auth.guard';

@Controller()
export class AuthController {
    constructor(private authService: AuthService) { }

    @UseGuards(LocalAuthGuard)
    @Post('auth/login')
    async login(@Request() req) {
      return this.authService.login(req.user);
    }

}