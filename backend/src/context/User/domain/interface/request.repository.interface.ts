import { RequestModel } from '../model/request.model';

export interface RequestRepositoryInterface {
  create(from: string, to: string): Promise<RequestModel>;
}
