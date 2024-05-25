import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

type AuthType = {
  id: string;
};

@Injectable()
export class JwtAuthUsecase {
  constructor(private readonly jwtService: JwtService) {}

  async generateToken(input: AuthType): Promise<string> {
    console.log('=====================================');
    console.log(this.jwtService.sign({ userId: input.id }));
    console.log('=====================================');
    return this.jwtService.sign({ userId: input.id });
  }

  async verifyToken(token: string) {
    return this.jwtService.verifyAsync(token);
  }
}
