import { Test, TestingModule } from '@nestjs/testing';
import {
  COUPLE_REPOSITORY,
  REQUEST_REPOSITORY,
  USER_REPOSITORY,
} from 'src/context/User/const/user.token';
import { CoupleRepositoryInterface } from 'src/context/User/domain/interface/couple.repository.interface';
import { RequestRepositoryInterface } from 'src/context/User/domain/interface/request.repository.interface';
import { UserRepositoryInterface } from 'src/context/User/domain/interface/user.repository.interface';
import { CoupleModel } from 'src/context/User/domain/model/couple.model';
import { RequestModel } from 'src/context/User/domain/model/request.model';
import { UserModel } from 'src/context/User/domain/model/user.model';
import { RequestTypes } from 'src/context/User/domain/model/valueObject/requestTypeId.value';
import { SendRequestUsecase } from 'src/context/User/usecase/sendRequest.usecase';

let usecase: SendRequestUsecase;
let userRepository: UserRepositoryInterface;
let coupleRepository: CoupleRepositoryInterface;
let requestRepository: RequestRepositoryInterface;

const sendUserMailaddress = 'sender@example.com';
const receivedUserMailaddress = 'receiver@example.com';

beforeEach(async () => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      SendRequestUsecase,
      {
        provide: USER_REPOSITORY,
        useValue: {
          getUserByMailaddress: jest.fn(),
        },
      },
      {
        provide: COUPLE_REPOSITORY,
        useValue: {
          findByUserId: jest.fn(),
        },
      },
      {
        provide: REQUEST_REPOSITORY,
        useValue: {
          create: jest.fn(),
        },
      },
    ],
  }).compile();

  usecase = module.get<SendRequestUsecase>(SendRequestUsecase);
  userRepository = module.get<UserRepositoryInterface>(USER_REPOSITORY);
  coupleRepository = module.get<CoupleRepositoryInterface>(COUPLE_REPOSITORY);
  requestRepository =
    module.get<RequestRepositoryInterface>(REQUEST_REPOSITORY);
});

describe('SendRequestUsecase', () => {
  describe('正常系', () => {
    it('coupleが成立済みの時、falseが返る', async () => {
      const name = 'テスト';
      const user = UserModel.create({
        id: '8d946a74-f3e1-464c-8cf5-f180e729892a',
        name,
        mailaddress: sendUserMailaddress,
      });
      const couple = CoupleModel.create({
        id: '7ff7e40a-3040-4119-836d-321c40d1b732',
        userId1: '8d946a74-f3e1-464c-8cf5-f180e729892a',
        userId2: 'c2f068b2-57bd-4074-9228-2a13e18141ee',
      });

      (userRepository.getUserByMailaddress as jest.Mock).mockResolvedValue(
        user,
      );
      (coupleRepository.findByUserId as jest.Mock).mockResolvedValue([couple]);

      const result = await usecase.execute(
        sendUserMailaddress,
        receivedUserMailaddress,
      );

      expect(userRepository.getUserByMailaddress).toHaveBeenCalled();
      expect(coupleRepository.findByUserId).toHaveBeenCalled();
      expect(requestRepository.create).not.toHaveBeenCalled();
      expect(result).toBe(false);
    });
    it('coupleが未成立の時、trueが返る', async () => {
      const name = 'テスト';
      const user = UserModel.create({
        id: '8d946a74-f3e1-464c-8cf5-f180e729892a',
        name,
        mailaddress: sendUserMailaddress,
      });
      const request = RequestModel.create({
        id: '7ff7e40a-3040-4119-836d-321c40d1b732',
        from: 'b6ac4860-21aa-43c7-bbcd-f8a47b86b362',
        to: 'c2f068b2-57bd-4074-9228-2a13e18141ee',
        typeId: RequestTypes.SENT,
      });

      (userRepository.getUserByMailaddress as jest.Mock).mockResolvedValue(
        user,
      );
      (coupleRepository.findByUserId as jest.Mock).mockResolvedValue([]);
      (requestRepository.create as jest.Mock).mockResolvedValue(request);

      const result = await usecase.execute(
        sendUserMailaddress,
        receivedUserMailaddress,
      );

      expect(userRepository.getUserByMailaddress).toHaveBeenCalled();
      expect(coupleRepository.findByUserId).toHaveBeenCalled();
      expect(requestRepository.create).toHaveBeenCalled();
      expect(result).toBe(true);
    });
  });

  describe('異常系', () => {
    it('リクエスト受信者のメールアドレスが存在しない時エラーになる', async () => {
      (userRepository.getUserByMailaddress as jest.Mock).mockResolvedValue(
        null,
      );

      await expect(
        usecase.execute(sendUserMailaddress, receivedUserMailaddress),
      ).rejects.toThrow();

      expect(userRepository.getUserByMailaddress).toHaveBeenCalled();
      expect(coupleRepository.findByUserId).not.toHaveBeenCalled();
      expect(requestRepository.create).not.toHaveBeenCalled();
    });
  });
});
