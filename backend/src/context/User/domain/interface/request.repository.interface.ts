import { RequestModel } from '../model/request.model';

export interface RequestRepositoryInterface {
  create(fromUserId: string, toUserId: string): Promise<RequestModel>;
}
