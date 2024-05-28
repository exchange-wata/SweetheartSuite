import { applyDecorators, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../guard/jwtAuth.guard';

export function JwtAuth() {
  return applyDecorators(UseGuards(JwtAuthGuard));
}
