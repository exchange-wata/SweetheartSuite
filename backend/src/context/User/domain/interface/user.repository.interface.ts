import { UserModel } from '../model/user.model';

export interface UserRepositoryInterface {
  getLoginUserName(mailaddress: string): Promise<UserModel>;
}
