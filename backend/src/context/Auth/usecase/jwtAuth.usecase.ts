import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

type AuthType = {
  id: string;
};

@Injectable()
export class JwtAuthService {
  constructor(private jwtService: JwtService) {}

  async generateToken(input: AuthType): Promise<string> {
    return this.jwtService.sign({ userId: input.id });
  }
}
