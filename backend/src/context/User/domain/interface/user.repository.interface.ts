import { Effect } from 'effect/Effect';
import { UserModel } from '../model/user.model';

export interface UserRepositoryInterface {
  getUserByMailaddress(mailaddress: string): Promise<UserModel>;
  create(
    name: string,
    mailaddress: string,
  ): Effect<UserModel, { _tag: 'can not create user' }>;
  findByUserId(id: string): Promise<UserModel>;
}
