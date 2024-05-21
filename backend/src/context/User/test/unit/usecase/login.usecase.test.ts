import { Test, TestingModule } from '@nestjs/testing';
import { AuthModule } from 'src/context/Auth/auth.module';
import { GoogleAuthUsecase } from 'src/context/Auth/usecase/googleAuth.usecase';
import { JwtAuthUsecase } from 'src/context/Auth/usecase/jwtAuth.usecase';
import { USER_REPOSITORY } from 'src/context/User/const/user.token';
import { UserRepositoryInterface } from 'src/context/User/domain/interface/user.repository.interface';
import { LoginUsecase } from 'src/context/User/usecase/login.usecase';

let usecase: LoginUsecase;
let userRepository: UserRepositoryInterface;
let jwtAuthUsecase: JwtAuthUsecase;
let googleAuthUsecase: GoogleAuthUsecase;

const jwtAuthUsecaseMock = {
  generateToken: jest.fn(),
};

const googleAuthUsecaseMock = {
  verifyToken: jest.fn(),
};

beforeAll(async () => {
  const module: TestingModule = await Test.createTestingModule({
    imports: [AuthModule],
    providers: [
      LoginUsecase,
      {
        provide: USER_REPOSITORY,
        useValue: {
          getUserByMailaddress: jest.fn(),
        },
      },
      {
        provide: JwtAuthUsecase,
        useValue: jwtAuthUsecaseMock,
      },
      {
        provide: GoogleAuthUsecase,
        useValue: googleAuthUsecaseMock,
      },
    ],
  }).compile();

  usecase = module.get<LoginUsecase>(LoginUsecase);
  jwtAuthUsecase = module.get<JwtAuthUsecase>(JwtAuthUsecase);
  googleAuthUsecase = module.get<GoogleAuthUsecase>(GoogleAuthUsecase);
  userRepository = module.get<UserRepositoryInterface>(USER_REPOSITORY);
});

afterEach(async () => {
  jest.resetAllMocks();
});

describe('LoginUsecase', () => {
  describe('正常系', () => {
    it('jwtが返ることを確認する', async () => {
      const token = 'mockedToken';
      const user = { id: 'd9653d3f-2fd5-43b4-9210-5c4995191a7c' };
      const ticket = { getPayload: () => ({ email: 'test@example.com' }) };
      (userRepository.getUserByMailaddress as jest.Mock).mockResolvedValue(
        user,
      );
      googleAuthUsecaseMock.verifyToken.mockResolvedValue(ticket);
      jwtAuthUsecaseMock.generateToken.mockResolvedValue('mockedJWTToken');

      const result = await usecase.execute(token);

      expect(result).toEqual('mockedJWTToken');
      expect(userRepository.getUserByMailaddress).toHaveBeenCalled();
      expect(googleAuthUsecaseMock.verifyToken).toHaveBeenCalled();
      expect(jwtAuthUsecaseMock.generateToken).toHaveBeenCalled();
    });

    it('ユーザーがない時、nullを返す', async () => {
      const token = 'mockedToken';
      const ticket = { getPayload: () => ({ email: 'test@example.com' }) };
      (userRepository.getUserByMailaddress as jest.Mock).mockResolvedValue(
        null,
      );
      googleAuthUsecaseMock.verifyToken.mockResolvedValue(ticket);

      const result = await usecase.execute(token);

      expect(result).toBeNull();
      expect(userRepository.getUserByMailaddress).toHaveBeenCalled();
      expect(googleAuthUsecaseMock.verifyToken).toHaveBeenCalled();
      expect(jwtAuthUsecaseMock.generateToken).not.toHaveBeenCalled();
    });
  });
});
