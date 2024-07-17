import { Controller, HttpCode, Get } from '@nestjs/common';

@Controller('health')
export class HealthController {
  @Get()
  @HttpCode(200)
  checkHealth() {
    return 'ok';
  }
}
