import { Effect } from 'effect';
import { TempUserRepositoryInterface } from 'src/context/User/domain/interface/tempUser.repository.interface';
import { CreateTempUserUsecase } from 'src/context/User/usecase/createTempUser.usecase';
import { createToken } from 'src/library/hash.library';

jest.mock('src/library/hash.library', () => ({
  createToken: jest.fn(() =>
    Effect.succeed({
      token: '$2b$10$nCEPh47jgMidzE0m4ZTtquefncSFJUqIdbEj8GvmHWgqYdC1ka5nC',
    }),
  ),
}));

describe('CreateTempUserUsecase', () => {
  const mailaddress = 'test@example.com';
  const tempUser = {
    id: 'd9653d3f-2fd5-43b4-9210-5c4995191a7c',
    mailaddress: { value: 'test@mail.com' },
    token: '$2b$10$nCEPh47jgMidzE0m4ZTtquefncSFJUqIdbEj8GvmHWgqYdC1ka5nC',
  };
  const tempUserRepository: Pick<TempUserRepositoryInterface, 'create'> = {
    create: jest.fn(() => Effect.succeed(tempUser)),
  };
  const createTempUserUsacese = new CreateTempUserUsecase(
    tempUserRepository as TempUserRepositoryInterface,
  );

  describe('正常系', () => {
    it('infra層を呼び出せているか', async () => {
      const result = await createTempUserUsacese.execute(mailaddress);

      expect(createToken).toHaveBeenCalled();
      expect(tempUserRepository.create).toHaveBeenCalled();
      expect(result).toBe(tempUser);
    });
  });

  describe('異常系', () => {
    it('メールアドレスが不正な時、エラーになる', async () => {
      const invalidMailaddress = 'invalid-email';

      await expect(
        createTempUserUsacese.execute(invalidMailaddress),
      ).rejects.toThrow();
    });
  });
});
