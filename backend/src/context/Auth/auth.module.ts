import { Module } from '@nestjs/common';
import { JwtAuthUsecase } from './usecase/jwtAuth.usecase';
import { JwtModule } from '@nestjs/jwt';
import { GoogleAuthUsecase } from './usecase/googleAuth.usecase';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1d' },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [JwtAuthUsecase, GoogleAuthUsecase],
  exports: [JwtAuthUsecase, GoogleAuthUsecase],
})
export class AuthModule {}
