import { RequestModel } from '../model/request.model';

export interface RequestRepositoryInterface {
  createRequest(from: string, to: string): Promise<RequestModel>;
}
