import { Effect } from 'effect/Effect';
import { UserErrorMessage } from '../../const/errorMessage/user.errorMessage';
import { UserModel } from '../model/user.model';

export interface UserRepositoryInterface {
  getUserByMailaddress(mailaddress: string): Promise<UserModel>;
  create(
    name: string,
    mailaddress: string,
  ): Effect<UserModel, { _tag: typeof UserErrorMessage.CREATE }>;
  findByUserId(id: string): Promise<UserModel>;
}
