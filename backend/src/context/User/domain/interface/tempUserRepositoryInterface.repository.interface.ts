import { TempUserModel } from '../model/tempUser.model';

export interface TempUserRepositoryInterface {
  create(mailaddress: string, token: string): Promise<TempUserModel>;
}
