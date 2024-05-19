import { TempUserModel } from '../model/tempUser.mode';

export interface TempUserRepositoryInterface {
  create(mailaddress: string): Promise<TempUserModel>;
}
