import { Test, TestingModule } from '@nestjs/testing';
import { Effect } from 'effect';
import { user } from 'prisma/seed/transaction/user';
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
  const tempUserRepository: TempUserRepositoryInterface = {
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
    create: jest.fn(),
  };

  const userRepository: UserRepositoryInterface = {
    create: jest.fn(() =>
      Effect.succeed({
        mailaddress: { value: 'test@mail.com' },
      } as UserModel),
    ),
    getUserByMailaddress: jest.fn(),
    findByUserId: jest.fn(),
  };

  it('正常系', async () => {
    const createUserUsecase = new CreateUserUsecase(
      userRepository,
      tempUserRepository,
    );

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
      const errorTempUserRepository: TempUserRepositoryInterface = {
        ...tempUserRepository,
        findByToken: jest.fn(() =>
          Effect.fail({ _tag: 'temp user not found' }),
        ),
      };
      const createUserUsecase = new CreateUserUsecase(
        userRepository,
        errorTempUserRepository,
      );

      const token = 'invalid-token';
      const name = 'test-name';

      await expect(createUserUsecase.execute(name, token)).rejects.toThrow();
    });

    it('ユーザー作成が失敗した時、エラーになる', async () => {
      const token = 'test-token';
      const name = 'test-name';

      const errorUserRepository: UserRepositoryInterface = {
        ...userRepository,
        create: jest.fn(() => Effect.fail({ _tag: 'can not create user' })),
      };
      const createUserUsecase = new CreateUserUsecase(
        errorUserRepository,
        tempUserRepository,
      );

      await expect(createUserUsecase.execute(name, token)).rejects.toThrow();
    });

    it('temp userの削除に失敗した時、エラーになる', async () => {
      const token = 'test-token';
      const name = 'test-name';

      const errorTempUserRepository: TempUserRepositoryInterface = {
        ...tempUserRepository,
        deleteMany: jest.fn(() =>
          Effect.fail({ _tag: 'can not delete temp user' }),
        ),
      };
      const createUserUsecase = new CreateUserUsecase(
        userRepository,
        errorTempUserRepository,
      );

      await expect(createUserUsecase.execute(name, token)).rejects.toThrow();
    });
  });
});
