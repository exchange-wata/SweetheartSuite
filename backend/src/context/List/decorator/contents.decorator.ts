import { applyDecorators, UseGuards } from '@nestjs/common';
import { ContentsAuthGuard } from '../guard/contents.guard';

export function ContentsAuth() {
  return applyDecorators(UseGuards(ContentsAuthGuard));
}
