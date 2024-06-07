import { Effect } from 'effect/Effect';
import { RequestModel } from '../model/request.model';
import { RequestTypes } from '../model/valueObject/requestTypeId.value';

export interface RequestRepositoryInterface {
  create(request: RequestModel): Effect<RequestModel, { _tag: string }>;
  update(request: RequestModel): Effect<RequestModel, { _tag: string }>;
  findByToUserId(toUserId: string): Effect<RequestModel, { _tag: string }>;
  findByToUserIdAndTypeId(
    toUserId: string,
    typeId: RequestTypes,
  ): Effect<RequestModel, { _tag: string }>;
}
