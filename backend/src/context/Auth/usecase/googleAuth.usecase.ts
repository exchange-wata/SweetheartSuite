import { Injectable } from '@nestjs/common';
import { LoginTicket, OAuth2Client } from 'google-auth-library';

@Injectable()
export class GoogleAuthUsecase {
  private readonly client: OAuth2Client;

  constructor() {
    this.client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  }

  async verifyToken(token: string): Promise<LoginTicket> {
    try {
      return this.client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
    } catch (error) {
      throw new Error('Invalid token');
    }
  }
}
