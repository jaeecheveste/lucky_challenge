import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('API')
@Controller()
export class AppController {
  constructor() {}

  @Get('/health')
  @ApiOperation({ summary: 'Health API' })
  @ApiOkResponse({
      description: 'Api Running OK',
      type: String,
    })
  getHello(): string {
    return 'API running sucessfully';
  }
}
