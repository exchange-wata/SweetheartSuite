import { Effect } from 'effect/Effect';
import { UserErrorMessage } from '../../const/errorMessage/user.errorMessage';
import { UserModel } from '../model/user.model';

export interface UserRepositoryInterface {
  getUserByMailaddress(
    mailaddress: string,
  ): Effect<
    UserModel,
    { _tag: typeof UserErrorMessage.GET_USER_BY_MAILADDRESS }
  >;
  create(
    name: string,
    mailaddress: string,
  ): Effect<UserModel, { _tag: typeof UserErrorMessage.CREATE }>;
  findByUserId(
    id: string,
  ): Effect<UserModel, { _tag: typeof UserErrorMessage.FIND_BY_USER_ID }>;
}
