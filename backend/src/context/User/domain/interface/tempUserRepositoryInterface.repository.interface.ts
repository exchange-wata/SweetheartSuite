import { TempUserModel } from '../model/tempUser.mode';

export interface TempUserRepositoryInterface {
  create(mailaddress: string, token: string): Promise<TempUserModel>;
}
