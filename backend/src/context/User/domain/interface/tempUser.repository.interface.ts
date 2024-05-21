import { TempUserModel } from '../model/tempUser.model';

export type BatchPayload = {
  count: number;
};

export interface TempUserRepositoryInterface {
  create(mailaddress: string, token: string): Promise<TempUserModel>;
  findByToken(token: string): Promise<TempUserModel>;
  deleteMany(mailaddress: string): Promise<BatchPayload>;
}
