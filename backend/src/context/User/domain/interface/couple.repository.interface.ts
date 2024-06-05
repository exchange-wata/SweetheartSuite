import { Effect } from 'effect/Effect';
import { CoupleModel } from '../model/couple.model';

export interface CoupleRepositoryInterface {
  findByUserId(userId: string): Effect<CoupleModel[], { _tag: string }>;
  create(coupleModel: CoupleModel): Effect<CoupleModel, { _tag: string }>;
}
