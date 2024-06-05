import { Effect } from 'effect/Effect';
import { RequestModel } from '../model/request.model';

export interface RequestRepositoryInterface {
  create(request: RequestModel): Effect<RequestModel, { _tag: string }>;
  update(request: RequestModel): Effect<RequestModel, { _tag: string }>;
  findByToUserId(toUserId: string): Effect<RequestModel, { _tag: string }>;
}
