import { UserModel } from '../model/user.model';

export interface UserRepositoryInterface {
  getUserByMailaddress(mailaddress: string): Promise<UserModel>;
  create(name: string, mailaddress: string): Promise<UserModel>;
}
