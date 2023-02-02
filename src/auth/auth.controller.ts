import { Controller, Request, Post, UseGuards, Get, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local.auth.guard';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginModel, LoginRespModel } from './auth.models';
import { ValidationBodyPipe } from 'src/common/decorators/validation.pipe';
import { LoginSchema } from './auth.schema';

@ApiTags('Authentication')
@Controller()
export class AuthController {
    constructor(private authService: AuthService) { }
    
    @UseGuards(LocalAuthGuard)
    @ApiOperation({ summary: 'Get Access token' })
    @ApiOkResponse({
      description: 'User profile created successfully.',
      type: LoginRespModel,
    })
    @Post('auth/login')
    async login(@Body(new ValidationBodyPipe(LoginSchema)) body: LoginModel,
    ): Promise<LoginRespModel> {
      return this.authService.login(body);
    }

}