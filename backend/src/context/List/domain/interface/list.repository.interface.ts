import { Effect } from 'effect/Effect';
import { ListModel } from '../../model/list.model';

export interface ListRepositoryInterface {
  create(listModel: ListModel): Effect<ListModel, { _tag: string }>;
  update(listModel: ListModel): Effect<ListModel, { _tag: string }>;
}
