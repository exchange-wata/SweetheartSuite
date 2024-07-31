import { Effect } from 'effect';
import { JwtAuthUsecase } from 'src/context/Auth/usecase/jwtAuth.usecase';
import { CoupleRepositoryInterface } from 'src/context/User/domain/interface/couple.repository.interface';
import { UserRepositoryInterface } from 'src/context/User/domain/interface/user.repository.interface';
import { CoupleModel } from 'src/context/User/domain/model/couple.model';
import { UserModel } from 'src/context/User/domain/model/user.model';
import { LoginUsecase } from 'src/context/User/usecase/login.usecase';

const mailaddress = 'test@test.com';
const user = { id: 'd9653d3f-2fd5-43b4-9210-5c4995191a7c' };
const couple = [{ id: 'couple_id' }];
const token = 'mockedToken';

const userRepository: Pick<UserRepositoryInterface, 'getUserByMailaddress'> = {
  getUserByMailaddress: jest.fn(() => Effect.succeed(user as UserModel)),
};
const coupleRepository: Pick<CoupleRepositoryInterface, 'findByUserId'> = {
  findByUserId: jest.fn(() => Effect.succeed(couple as CoupleModel[])),
};
const jwtAuthUsecase: Pick<JwtAuthUsecase, 'generateToken'> = {
  generateToken: jest.fn(() => Effect.succeed(token)),
};

const loginUsecase: LoginUsecase = new LoginUsecase(
  userRepository as UserRepositoryInterface,
  coupleRepository as CoupleRepositoryInterface,
  jwtAuthUsecase as JwtAuthUsecase,
);

describe('LoginUsecase', () => {
  describe('正常系', () => {
    it('jwtが返ることを確認する', async () => {
      const result = await loginUsecase.execute(mailaddress);

      expect(result).toEqual(token);
      expect(userRepository.getUserByMailaddress).toHaveBeenCalled();
      expect(jwtAuthUsecase.generateToken).toHaveBeenCalled();
    });
  });
});
