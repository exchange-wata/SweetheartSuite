import { Test, TestingModule } from '@nestjs/testing';
import { USER_REPOSITORY } from 'src/context/User/const/user.token';
import { UserRepositoryInterface } from 'src/context/User/domain/interface/user.repository.interface';
import { UserModel } from 'src/context/User/domain/model/user.model';
import { Mailaddress } from 'src/context/User/domain/model/valueObject/mailaddress.value';
import { GetUserByMailaddressUsecase } from 'src/context/User/usecase/getUserByMailaddress.usecase';

describe('GetUserByMailaddressUsecase', () => {
  let usecase: GetUserByMailaddressUsecase;
  let userRepository: UserRepositoryInterface;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetUserByMailaddressUsecase,
        {
          provide: USER_REPOSITORY,
          useValue: {
            getUserByMailaddress: jest.fn(),
          },
        },
      ],
    }).compile();

    usecase = module.get<GetUserByMailaddressUsecase>(
      GetUserByMailaddressUsecase,
    );
    userRepository = module.get<UserRepositoryInterface>(USER_REPOSITORY);
  });

  describe('正常系', () => {
    it('infra層を呼び出せているか', async () => {
      const mailaddress = 'test@example.com';
      const user = UserModel.create({
        id: 'd9653d3f-2fd5-43b4-9210-5c4995191a7c',
        name: 'テスト',
        mailaddress,
      });
      (userRepository.getUserByMailaddress as jest.Mock).mockResolvedValue(
        user,
      );

      const result = await usecase.getUserByMailaddress(mailaddress);
      const validatedMailaddress = Mailaddress.create(mailaddress);

      expect(userRepository.getUserByMailaddress).toHaveBeenCalledWith(
        validatedMailaddress.value,
      );
      expect(result).toBe(user);
    });
  });

  describe('異常系', () => {
    it('メールアドレスが不正な時、エラーになる', async () => {
      const invalidMailaddress = 'invalid-email';

      await expect(
        usecase.getUserByMailaddress(invalidMailaddress),
      ).rejects.toThrow();
    });
  });
});
