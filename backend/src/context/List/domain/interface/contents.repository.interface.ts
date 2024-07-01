import { Effect } from 'effect/Effect';
import { ContentsModel } from '../model/contents.model';

export interface ContentsRepositoryInterface {
  create(listModel: ContentsModel): Effect<ContentsModel, { _tag: string }>;
}
