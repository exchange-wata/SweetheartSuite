import { applyDecorators, UseGuards } from '@nestjs/common';
import { CoupleGuard } from '../guard/couple.guard';
import { ListGuard } from '../guard/list.guard';
import { UserGuard } from '../guard/user.guard';

export function UserHasList() {
  return applyDecorators(UseGuards(ListGuard, UserGuard, CoupleGuard));
}
