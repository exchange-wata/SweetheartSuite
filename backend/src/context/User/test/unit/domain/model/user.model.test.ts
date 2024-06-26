import { UserModel } from 'src/context/User/domain/model/user.model';

describe('user modelのテスト', () => {
  it('正常系', () => {
    const input = {
      id: '7ff7e40a-3040-4119-836d-321c40d1b732',
      name: 'テスト',
      mailaddress: 'test@example.com',
    };
    const result = UserModel.create(input);
    expect(result).toBeInstanceOf(UserModel);
  });
});
