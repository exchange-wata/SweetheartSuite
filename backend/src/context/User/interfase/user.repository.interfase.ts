export interface UserRepositoryInterface {
  getLoginUserName(mailaddress: string): Promise<string>;
}
