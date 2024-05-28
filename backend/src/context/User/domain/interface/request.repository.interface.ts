import { RequestModel } from '../model/request.model';
import { RequestTypes } from '../model/valueObject/requestTypeId.value';

export interface RequestRepositoryInterface {
  create(fromUserId: string, toUserId: string): Promise<RequestModel>;
  update(toUserId: string, typeId: RequestTypes): Promise<RequestModel>;
}
