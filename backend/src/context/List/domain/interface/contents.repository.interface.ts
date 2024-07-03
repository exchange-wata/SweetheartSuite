import { Effect } from 'effect/Effect';
import { ContentsModel } from '../model/contents.model';

export interface ContentsRepositoryInterface {
  create(listModel: ContentsModel): Effect<ContentsModel, { _tag: string }>;
  findByIdAndListId(
    id: string,
    listId: string,
  ): Effect<ContentsModel, { _tag: string }>;
  update(listModel: ContentsModel): Effect<ContentsModel, { _tag: string }>;
}
