import { Test, TestingModule } from '@nestjs/testing';
import { TEMP_USER_REPOSITORY } from 'src/context/User/const/user.token';
import { TempUserRepositoryInterface } from 'src/context/User/domain/interface/tempUser.repository.interface';
import { TempUserModel } from 'src/context/User/domain/model/tempUser.model';
import { CreateTempUserUsecase } from 'src/context/User/usecase/createTempUser.usecase';
import { createToken } from 'src/library/hash.library';

jest.mock('src/library/hash.library', () => ({
  createToken: jest.fn(),
}));

let usecase: CreateTempUserUsecase;
let tempUserRepository: TempUserRepositoryInterface;

beforeAll(async () => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      CreateTempUserUsecase,
      {
        provide: TEMP_USER_REPOSITORY,
        useValue: {
          create: jest.fn(),
        },
      },
    ],
  }).compile();

  usecase = module.get<CreateTempUserUsecase>(CreateTempUserUsecase);
  tempUserRepository =
    module.get<TempUserRepositoryInterface>(TEMP_USER_REPOSITORY);
});

describe('CreateTempUserUsecase', () => {
  describe('正常系', () => {
    it('infra層を呼び出せているか', async () => {
      const mailaddress = 'test@example.com';
      const tempUser = TempUserModel.create({
        id: 'd9653d3f-2fd5-43b4-9210-5c4995191a7c',
        mailaddress,
        token: '$2b$10$nCEPh47jgMidzE0m4ZTtquefncSFJUqIdbEj8GvmHWgqYdC1ka5nC',
      });

      (createToken as jest.Mock).mockResolvedValue(tempUser.token);
      (tempUserRepository.create as jest.Mock).mockResolvedValue(tempUser);

      const result = await usecase.execute(mailaddress);

      expect(createToken).toHaveBeenCalled();
      expect(tempUserRepository.create).toHaveBeenCalled();
      expect(result).toBe(tempUser);
    });
  });

  describe('異常系', () => {
    it('メールアドレスが不正な時、エラーになる', async () => {
      const invalidMailaddress = 'invalid-email';

      await expect(usecase.execute(invalidMailaddress)).rejects.toThrow();
    });
  });
});
