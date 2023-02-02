
import { Body, Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { UserProfileModel, UserProfileRespModel } from './users.profile.model';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('user')
export class UsersController {
  constructor(private serv: UsersService) { }

  @Post('/signup')
  @ApiOperation({ summary: 'Creates a new user with profile' })
  @ApiOkResponse({
    description: 'User profile created successfully.',
    type: String,
  })
    async createUserProfile(
        @Body() body: UserProfileModel,
    ): Promise<string> {
        const result = await this.serv.createUserProfile(body);

        return result;
    }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  @ApiOperation({ summary: 'Retrieves an user profile' })
  @ApiOkResponse({
    description: 'User profile retrieved successfully.',
    type: UserProfileRespModel,
  })
    async getProfile(@Request() req): Promise<UserProfileRespModel> {
      const { username } = req.user;

      return await this.serv.getUserProfile(username);
    }
}