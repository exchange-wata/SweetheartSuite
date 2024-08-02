import { applyDecorators, UseGuards } from '@nestjs/common';
import { ListAuthGuard } from '../guard/list.guard';

export function ListAuth() {
  return applyDecorators(UseGuards(ListAuthGuard));
}
