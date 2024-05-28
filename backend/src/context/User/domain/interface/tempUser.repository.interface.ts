import { Effect } from 'effect/Effect';
import { TempUserModel } from '../model/tempUser.model';

export type BatchPayload = {
  count: number;
};

export interface TempUserRepositoryInterface {
  create(mailaddress: string, token: string): Promise<TempUserModel>;
  findByToken(
    token: string,
  ): Effect<TempUserModel, { _tag: 'temp user not found' }>;
  deleteMany(
    mailaddress: string,
  ): Effect<BatchPayload, { _tag: 'can not delete temp user' }>;
}
