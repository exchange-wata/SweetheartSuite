import { applyDecorators, UseGuards } from '@nestjs/common';
import { jwtAuthGuard } from '../guard/jwtAuth.guard';

export function JwtAuth() {
  return applyDecorators(UseGuards(jwtAuthGuard));
}
