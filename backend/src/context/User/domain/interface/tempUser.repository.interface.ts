import { Effect } from 'effect/Effect';
import { TempUserErrorMessage } from '../../const/errorMessage/tempUser.errorMessage';
import { TempUserModel } from '../model/tempUser.model';

export type BatchPayload = {
  count: number;
};

export interface TempUserRepositoryInterface {
  create(mailaddress: string, token: string): Promise<TempUserModel>;
  findByToken(
    token: string,
  ): Effect<TempUserModel, { _tag: typeof TempUserErrorMessage.FIND_BY_TOKEN }>;
  deleteMany(
    mailaddress: string,
  ): Effect<BatchPayload, { _tag: typeof TempUserErrorMessage.DELETE_MANY }>;
}
