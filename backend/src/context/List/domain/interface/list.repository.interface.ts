import { Effect } from 'effect/Effect';
import { ListModel } from '../model/list.model';

export interface ListRepositoryInterface {
  findByListId(listId: string): Effect<ListModel, { _tag: string }>;
  findByCoupleId(coupleId: string): Effect<ListModel[], { _tag: string }>;
  create(listModel: ListModel): Effect<ListModel, { _tag: string }>;
  update(listModel: ListModel): Effect<ListModel, { _tag: string }>;
}
