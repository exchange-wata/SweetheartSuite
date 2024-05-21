import { Module } from '@nestjs/common';
import { JwtAuthUsecase } from './usecase/jwtAuth.usecase';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [JwtService, JwtAuthUsecase],
  exports: [JwtAuthUsecase],
})
export class AuthModule {}
