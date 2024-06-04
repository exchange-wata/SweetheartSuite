import { Effect } from 'effect';
import { CoupleRepositoryInterface } from 'src/context/User/domain/interface/couple.repository.interface';
import { RequestRepositoryInterface } from 'src/context/User/domain/interface/request.repository.interface';
import { UserRepositoryInterface } from 'src/context/User/domain/interface/user.repository.interface';
import { CoupleModel } from 'src/context/User/domain/model/couple.model';
import { RequestModel } from 'src/context/User/domain/model/request.model';
import { UserModel } from 'src/context/User/domain/model/user.model';
import { RequestTypes } from 'src/context/User/domain/model/valueObject/requestTypeId.value';
import { SendRequestUsecase } from 'src/context/User/usecase/sendRequest.usecase';

const name = 'テスト';
const senderId = '8d946a74-f3e1-464c-8cf5-f180e729892a';
const receiverId = 'c2f068b2-57bd-4074-9228-2a13e18141ee';
const sendUserMailaddress = 'sender@example.com';
const receivedUserMailaddress = 'receiver@example.com';
const sender = UserModel.create({
  id: senderId,
  name,
  mailaddress: sendUserMailaddress,
});
const receiver = UserModel.create({
  id: receiverId,
  name,
  mailaddress: receivedUserMailaddress,
});
const couple = CoupleModel.create({
  id: '7ff7e40a-3040-4119-836d-321c40d1b732',
  userId1: senderId,
  userId2: receiverId,
});
const request = RequestModel.create({
  id: '0ef650d7-6a48-4395-954c-6770c21e34bb',
  fromUserId: senderId,
  toUserId: receiverId,
  typeId: RequestTypes.SENT,
});

const userRepository: Pick<
  UserRepositoryInterface,
  'getUserByMailaddress' | 'findByUserId'
> = {
  findByUserId: jest.fn(() => Effect.succeed(sender)),
  getUserByMailaddress: jest.fn(() => Effect.succeed(receiver)),
};

const coupleRepository: Pick<CoupleRepositoryInterface, 'findByUserId'> = {
  findByUserId: jest.fn(() => Effect.succeed([couple])),
};

const requestRepository: Pick<RequestRepositoryInterface, 'create'> = {
  create: jest.fn(
    () =>
      Effect.succeed(request) as unknown as Effect.Effect<
        RequestModel,
        { _tag: string },
        never
      >,
  ),
};

const sendRequestUsacese = new SendRequestUsecase(
  userRepository as UserRepositoryInterface,
  coupleRepository as CoupleRepositoryInterface,
  requestRepository as RequestRepositoryInterface,
);

describe('SendRequestUsecase', () => {
  describe('正常系', () => {
    it('coupleが成立済みの時、falseが返る', async () => {
      const result = await sendRequestUsacese.execute(
        sendUserMailaddress,
        receivedUserMailaddress,
      );

      expect(userRepository.findByUserId).toHaveBeenCalled();
      expect(userRepository.getUserByMailaddress).toHaveBeenCalled();
      expect(coupleRepository.findByUserId).toHaveBeenCalled();
      expect(requestRepository.create).not.toHaveBeenCalled();
      expect(result).toBe(false);
    });

    it('coupleが未成立の時、trueが返る', async () => {
      const coupleRepository: Pick<CoupleRepositoryInterface, 'findByUserId'> =
        {
          findByUserId: jest.fn(() => Effect.succeed([])),
        };
      const sendRequestUsacese = new SendRequestUsecase(
        userRepository as UserRepositoryInterface,
        coupleRepository as CoupleRepositoryInterface,
        requestRepository as RequestRepositoryInterface,
      );

      const result = await sendRequestUsacese.execute(
        sendUserMailaddress,
        receivedUserMailaddress,
      );

      expect(userRepository.findByUserId).toHaveBeenCalled();
      expect(userRepository.getUserByMailaddress).toHaveBeenCalled();
      expect(coupleRepository.findByUserId).toHaveBeenCalled();
      expect(requestRepository.create).toHaveBeenCalled();
      expect(result).toBe(true);
    });

    it('リクエスト受信者のメールアドレスが存在しない時、falseが返る', async () => {
      const userRepository: Pick<
        UserRepositoryInterface,
        'getUserByMailaddress' | 'findByUserId'
      > = {
        findByUserId: jest.fn(() => Effect.succeed(sender)),
        getUserByMailaddress: jest.fn(() => Effect.succeed({} as UserModel)),
      };
      const sendRequestUsacese = new SendRequestUsecase(
        userRepository as UserRepositoryInterface,
        coupleRepository as CoupleRepositoryInterface,
        requestRepository as RequestRepositoryInterface,
      );

      const result = await sendRequestUsacese.execute(
        sendUserMailaddress,
        receivedUserMailaddress,
      );

      expect(userRepository.getUserByMailaddress).toHaveBeenCalled();
      expect(userRepository.findByUserId).toHaveBeenCalled();
      expect(coupleRepository.findByUserId).toHaveBeenCalled();
      expect(requestRepository.create).toHaveBeenCalled();
      expect(result).toBe(false);
    });
  });
});
