import { Effect } from 'effect/Effect';
import { CoupleErrorMessage } from '../../const/errorMessage/couple.errorMessage';
import { CoupleModel } from '../model/couple.model';

export interface CoupleRepositoryInterface {
  findByUserId(
    userId: string,
  ): Effect<CoupleModel[], { _tag: typeof CoupleErrorMessage.FIND_BY_USER_ID }>;
  create(
    userId1: string,
    userId2: string,
  ): Effect<CoupleModel, { _tag: typeof CoupleErrorMessage.CREATE }>;
}
