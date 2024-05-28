import { Test, TestingModule } from '@nestjs/testing';
import { Effect } from 'effect';
import {
  TEMP_USER_REPOSITORY,
  USER_REPOSITORY,
} from 'src/context/User/const/user.token';
import { TempUserRepositoryInterface } from 'src/context/User/domain/interface/tempUser.repository.interface';
import { UserRepositoryInterface } from 'src/context/User/domain/interface/user.repository.interface';
import { TempUserModel } from 'src/context/User/domain/model/tempUser.model';
import { UserModel } from 'src/context/User/domain/model/user.model';
import { CreateUserUsecase } from 'src/context/User/usecase/createUser.usecase';

describe('CreateUserUsecase', () => {
  let createUserUsecase: CreateUserUsecase;
  const tempUserRepository: Pick<
    TempUserRepositoryInterface,
    'findByToken' | 'deleteMany'
  > = {
    findByToken: jest.fn(() =>
      Effect.succeed({
        id: '9424650b-208e-4c91-a656-38785ae6ca86',
        mailaddress: { value: 'test@mail.com' },
        token: '$2b$10$1HB3A8sbvmENS.1xLFfKAu.K.JMI5Pi4/4urpWKdBQf5wAk9xdUEC',
      } as TempUserModel),
    ),
    deleteMany: jest.fn(() =>
      Effect.succeed({
        count: 1,
      }),
    ),
  };

  const userRepository: Pick<UserRepositoryInterface, 'create'> = {
    create: jest.fn(() =>
      Effect.succeed({
        mailaddress: { value: 'test@mail.com' },
      } as UserModel),
    ),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateUserUsecase,
        {
          provide: TEMP_USER_REPOSITORY,
          useValue: tempUserRepository,
        },
        {
          provide: USER_REPOSITORY,
          useValue: userRepository,
        },
      ],
    }).compile();

    createUserUsecase = module.get<CreateUserUsecase>(CreateUserUsecase);
  });

  it('正常系', async () => {
    const token = 'test-token';
    const name = 'test-name';
    const tempUser = {
      id: '9424650b-208e-4c91-a656-38785ae6ca86',
      mailaddress: { value: 'test@mail.com' },
      token: '$2b$10$1HB3A8sbvmENS.1xLFfKAu.K.JMI5Pi4/4urpWKdBQf5wAk9xdUEC',
    };
    const createdUser = {
      mailaddress: { value: 'test@mail.com' },
    } as UserModel;

    const result = await createUserUsecase.execute(name, token);

    expect(tempUserRepository.findByToken).toHaveBeenCalledWith(token);
    expect(userRepository.create).toHaveBeenCalledWith(
      name,
      tempUser.mailaddress.value,
    );
    expect(tempUserRepository.deleteMany).toHaveBeenCalledWith(
      createdUser.mailaddress.value,
    );
    expect(result).toStrictEqual(createdUser);
  });

  describe('異常系', () => {
    it('temp userが存在しない時、エラーになる', async () => {
      const token = 'invalid-token';
      const name = 'test-name';

      (tempUserRepository.findByToken as jest.Mock).mockImplementation(
        () => new Error(),
      );

      await expect(createUserUsecase.execute(name, token)).rejects.toThrow();
    });

    it('ユーザー作成が失敗した時、エラーになる', async () => {
      const token = 'test-token';
      const name = 'test-name';
      const tempUser = { mailaddress: { value: 'test@mail.com' } };

      (tempUserRepository.findByToken as jest.Mock).mockResolvedValue(tempUser);
      (userRepository.create as jest.Mock).mockImplementation(
        () => new Error(),
      );

      await expect(createUserUsecase.execute(name, token)).rejects.toThrow();
    });

    it('temp userの削除に失敗した時、エラーになる', async () => {
      const token = 'test-token';
      const name = 'test-name';
      const tempUser = { mailaddress: { value: 'test@mail.com' } };
      const createdUser = {
        mailaddress: { value: 'test@mail.com' },
      } as UserModel;

      (tempUserRepository.findByToken as jest.Mock).mockResolvedValue(tempUser);
      (userRepository.create as jest.Mock).mockResolvedValue(createdUser);
      (tempUserRepository.deleteMany as jest.Mock).mockImplementation(
        () => new Error(),
      );

      await expect(createUserUsecase.execute(name, token)).rejects.toThrow();
    });
  });
});
