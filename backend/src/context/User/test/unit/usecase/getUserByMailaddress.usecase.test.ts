import { Effect } from 'effect';
import { UserRepositoryInterface } from 'src/context/User/domain/interface/user.repository.interface';
import { UserModel } from 'src/context/User/domain/model/user.model';
import { GetUserByMailaddressUsecase } from 'src/context/User/usecase/getUserByMailaddress.usecase';

describe('GetUserByMailaddressUsecase', () => {
  const mailaddress = 'test@example.com';
  const user = UserModel.create({
    id: 'd9653d3f-2fd5-43b4-9210-5c4995191a7c',
    name: 'テスト',
    mailaddress,
  });
  const userRepository: Pick<UserRepositoryInterface, 'getUserByMailaddress'> =
    {
      getUserByMailaddress: jest.fn(() => Effect.succeed(user)),
    };

  const getUserByMailaddressUsacese = new GetUserByMailaddressUsecase(
    userRepository as UserRepositoryInterface,
  );

  describe('正常系', () => {
    it('infra層を呼び出せているか', async () => {
      const result = await getUserByMailaddressUsacese.execute(mailaddress);

      expect(userRepository.getUserByMailaddress).toHaveBeenCalled();
      expect(result).toBe(user);
    });
  });

  describe('異常系', () => {
    it('メールアドレスが不正な時、エラーになる', async () => {
      const invalidMailaddress = 'invalid-email';

      await expect(
        getUserByMailaddressUsacese.execute(invalidMailaddress),
      ).rejects.toThrow();
    });
  });
});
