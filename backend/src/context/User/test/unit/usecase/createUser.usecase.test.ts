import { Test, TestingModule } from '@nestjs/testing';
import {
  TEMP_USER_REPOSITORY,
  USER_REPOSITORY,
} from 'src/context/User/const/user.token';
import { TempUserRepositoryInterface } from 'src/context/User/domain/interface/tempUser.repository.interface';
import { UserRepositoryInterface } from 'src/context/User/domain/interface/user.repository.interface';
import { TempUserModel } from 'src/context/User/domain/model/tempUser.model';
import { UserModel } from 'src/context/User/domain/model/user.model';
import { CreateUserUsecase } from 'src/context/User/usecase/createUser.usecase';
import { createToken } from 'src/library/hash.library';

let usecase: CreateUserUsecase;
let userRepository: UserRepositoryInterface;
let tempUserRepository: TempUserRepositoryInterface;

beforeEach(async () => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      CreateUserUsecase,
      {
        provide: USER_REPOSITORY,
        useValue: {
          create: jest.fn(),
        },
      },
      {
        provide: TEMP_USER_REPOSITORY,
        useValue: {
          findByToken: jest.fn(),
          deleteMany: jest.fn(),
        },
      },
    ],
  }).compile();

  usecase = module.get<CreateUserUsecase>(CreateUserUsecase);
  userRepository = module.get<UserRepositoryInterface>(USER_REPOSITORY);
  tempUserRepository =
    module.get<TempUserRepositoryInterface>(TEMP_USER_REPOSITORY);
});

describe('CreateTempUserUsecase', () => {
  describe('正常系', () => {
    it('infra層を呼び出せているか', async () => {
      const name = 'テスト';
      const mailaddress = 'test@example.com';
      const token =
        '$2b$10$nCEPh47jgMidzE0m4ZTtquefncSFJUqIdbEj8GvmHWgqYdC1ka5nC';

      const tempUser = TempUserModel.create({
        id: 'd9653d3f-2fd5-43b4-9210-5c4995191a7c',
        mailaddress,
        token,
      });
      const user = UserModel.create({
        id: '8d946a74-f3e1-464c-8cf5-f180e729892a',
        name,
        mailaddress,
      });

      (userRepository.create as jest.Mock).mockResolvedValue(user);
      (tempUserRepository.findByToken as jest.Mock).mockResolvedValue([
        tempUser,
      ]);
      (tempUserRepository.deleteMany as jest.Mock).mockResolvedValue({
        count: 1,
      });

      const result = await usecase.execute(name, token);

      expect(userRepository.create).toHaveBeenCalled();
      expect(tempUserRepository.findByToken).toHaveBeenCalled();
      expect(tempUserRepository.deleteMany).toHaveBeenCalled();
      expect(result).toBe(user);
    });
  });

  describe('異常系', () => {
    it('ユーザー作成が失敗したとき、エラーになる', async () => {
      const name = 'テスト';
      const mailaddress = 'test@example.com';
      const token =
        '$2b$10$nCEPh47jgMidzE0m4ZTtquefncSFJUqIdbEj8GvmHWgqYdC1ka5nC';

      const tempUser = TempUserModel.create({
        id: 'd9653d3f-2fd5-43b4-9210-5c4995191a7c',
        mailaddress,
        token,
      });

      (userRepository.create as jest.Mock).mockResolvedValue(null);
      (tempUserRepository.findByToken as jest.Mock).mockResolvedValue([
        tempUser,
      ]);
      await expect(usecase.execute(name, token)).rejects.toThrow(
        'can not create user',
      );

      expect(userRepository.create).toHaveBeenCalled();
      expect(tempUserRepository.findByToken).toHaveBeenCalled();
      expect(tempUserRepository.deleteMany).not.toHaveBeenCalled();
    });
  });
});
