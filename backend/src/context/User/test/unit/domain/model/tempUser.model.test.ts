import { TempUserModel } from 'src/context/User/domain/model/tempUser.model';

describe('tempUser modelのテスト', () => {
  it('正常系', () => {
    const input = {
      id: '7ff7e40a-3040-4119-836d-321c40d1b732',
      mailaddress: 'test@example.com',
      token: '$2b$10$nCEPh47jgMidzE0m4ZTtquefncSFJUqIdbEj8GvmHWgqYdC1ka5nC',
    };
    const result = TempUserModel.create(input);
    expect(result).toBeInstanceOf(TempUserModel);
  });
});
