import { Effect } from 'effect/Effect';
import { ContentsModel } from '../model/contents.model';

type BatchPayload = {
  count: number;
};

export interface ContentsRepositoryInterface {
  create(listModel: ContentsModel): Effect<ContentsModel, { _tag: string }>;
  findById(id: string): Effect<ContentsModel[], { _tag: string }>;
  findByListId(listId: string): Effect<ContentsModel[], { _tag: string }>;
  update(listModel: ContentsModel): Effect<ContentsModel, { _tag: string }>;
  deleteMany(ids: string[]): Effect<BatchPayload, { _tag: string }>;
}
