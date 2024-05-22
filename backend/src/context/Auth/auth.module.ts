import { Module } from '@nestjs/common';
import { JwtAuthUsecase } from './usecase/jwtAuth.usecase';
import { JwtService } from '@nestjs/jwt';
import { GoogleAuthUsecase } from './usecase/googleAuth.usecase';

@Module({
  providers: [JwtService, JwtAuthUsecase, GoogleAuthUsecase],
  exports: [JwtAuthUsecase, GoogleAuthUsecase],
})
export class AuthModule {}
