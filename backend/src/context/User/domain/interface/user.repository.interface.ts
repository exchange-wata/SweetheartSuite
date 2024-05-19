import { UserModel } from '../model/user.model';

export interface UserRepositoryInterface {
  getUserByMailaddress(mailaddress: string): Promise<UserModel>;
}
