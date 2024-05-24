import { Module } from '@nestjs/common';
import { JwtAuthUsecase } from './usecase/jwtAuth.usecase';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { GoogleAuthUsecase } from './usecase/googleAuth.usecase';
import { jwtConst } from './const/jwt.const';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConst.secret,
    }),
  ],
  providers: [JwtService, JwtAuthUsecase, GoogleAuthUsecase],
  exports: [JwtAuthUsecase, GoogleAuthUsecase],
})
export class AuthModule {}
