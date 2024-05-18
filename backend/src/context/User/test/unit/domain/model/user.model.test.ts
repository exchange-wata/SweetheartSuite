import { UserModel } from '../../../../domain/model/user.model';

describe('user modelのテスト', () => {
  it('正常系', () => {
    const input = {
      id: 1,
      name: 'テスト',
      mailaddress: 'test@example.com',
    };
    const result = UserModel.create(input);
    expect(result).toBeInstanceOf(UserModel);
  });
});
