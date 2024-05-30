import { Effect } from 'effect';
import { GoogleAuthUsecase } from 'src/context/Auth/usecase/googleAuth.usecase';
import { JwtAuthUsecase } from 'src/context/Auth/usecase/jwtAuth.usecase';
import { UserRepositoryInterface } from 'src/context/User/domain/interface/user.repository.interface';
import { UserModel } from 'src/context/User/domain/model/user.model';
import { LoginUsecase } from 'src/context/User/usecase/login.usecase';

const user = { id: 'd9653d3f-2fd5-43b4-9210-5c4995191a7c' };
const token = 'mockedToken';
const email = 'test@example.com';

const userRepository: Pick<UserRepositoryInterface, 'getUserByMailaddress'> = {
  getUserByMailaddress: jest.fn(() => Effect.succeed(user as UserModel)),
};
const jwtAuthUsecase: Pick<JwtAuthUsecase, 'generateToken'> = {
  generateToken: jest.fn(() => Effect.succeed(token)),
};
const googleAuthUsecase: Pick<GoogleAuthUsecase, 'verifyToken'> = {
  verifyToken: jest.fn(() => Effect.succeed(email)),
};

const loginUsecase: LoginUsecase = new LoginUsecase(
  userRepository as UserRepositoryInterface,
  jwtAuthUsecase as JwtAuthUsecase,
  googleAuthUsecase as GoogleAuthUsecase,
);

describe('LoginUsecase', () => {
  describe('正常系', () => {
    it('jwtが返ることを確認する', async () => {
      const result = await loginUsecase.execute(token);

      expect(result).toEqual(token);
      expect(userRepository.getUserByMailaddress).toHaveBeenCalled();
      expect(googleAuthUsecase.verifyToken).toHaveBeenCalled();
      expect(jwtAuthUsecase.generateToken).toHaveBeenCalled();
    });
  });
});
