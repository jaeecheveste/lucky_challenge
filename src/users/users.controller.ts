
import { Body, Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { UserProfileModel, UserProfileRespModel } from './users.profile.model';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
  constructor(private serv: UsersService) { }

  @Post('/signup')
    async createUserProfile(
        @Body() body: UserProfileModel,
    ): Promise<string> {
        const result = await this.serv.createUserProfile(body);

        return result;
    }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
    async getProfile(@Request() req): Promise<UserProfileRespModel> {
      const { username } = req.user;

      return await this.serv.getUserProfile(username);
    }
}