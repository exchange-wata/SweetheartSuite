import { Module } from '@nestjs/common';
import { JwtAuthService } from './usecase/jwtAuth.usecase';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [JwtService, JwtAuthService],
  exports: [JwtAuthService],
})
export class AuthModule {}
