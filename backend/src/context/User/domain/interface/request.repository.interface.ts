import { Effect } from 'effect/Effect';
import { RequestErrorMessage } from '../../const/errorMessage/request.errorMessage';
import { RequestModel } from '../model/request.model';
import { RequestTypes } from '../model/valueObject/requestTypeId.value';

export interface RequestRepositoryInterface {
  create(
    fromUserId: string,
    toUserId: string,
  ): Effect<RequestModel, { _tag: typeof RequestErrorMessage.CREATE }>;
  update(toUserId: string, typeId: RequestTypes): Promise<RequestModel>;
}
