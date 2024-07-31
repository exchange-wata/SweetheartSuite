import { Effect } from 'effect';
import { runSync } from 'effect/Effect';
import { JwtAuthUsecase } from 'src/context/Auth/usecase/jwtAuth.usecase';
import { RequestRepositoryInterface } from 'src/context/User/domain/interface/request.repository.interface';
import { CoupleModel } from 'src/context/User/domain/model/couple.model';
import { RequestModel } from 'src/context/User/domain/model/request.model';
import { RequestTypes } from 'src/context/User/domain/model/valueObject/requestTypeId.value';
import { CoupleRepository } from 'src/context/User/infra/couple.repository';
import { RequestRepository } from 'src/context/User/infra/request.repository';
import { CreateCoupleUsecase } from 'src/context/User/usecase/createCouple.usecase';

const requestId = 'request-id';
const fromUserId = 'sender-id';
const toUserId = 'receiver-id';

const request = RequestModel.create({
  id: requestId,
  fromUserId,
  toUserId,
  typeId: RequestTypes.APPROVED,
});
const couple = CoupleModel.create({
  id: 'couple-id',
  userId1: fromUserId,
  userId2: toUserId,
});

const requestRepository: Pick<
  RequestRepositoryInterface,
  'update' | 'findByToUserId'
> = {
  update: jest.fn(() => request),
  findByToUserId: jest.fn(() =>
    RequestModel.create({
      id: requestId,
      fromUserId,
      toUserId,
      typeId: RequestTypes.SENT,
    }),
  ),
};
const coupleRepository: Pick<CoupleRepository, 'create'> = {
  create: jest.fn(() => couple),
};
const jwtAuthUsecase: Pick<JwtAuthUsecase, 'generateToken'> = {
  generateToken: jest.fn(() => Effect.succeed('token')),
};

const createCoupleUsecase = new CreateCoupleUsecase(
  requestRepository as RequestRepository,
  coupleRepository as CoupleRepository,
  jwtAuthUsecase as JwtAuthUsecase,
);

describe('CreateCoupleUsecase', () => {
  it('リクエストが承認されたとき、jwtが返る', async () => {
    const result = await createCoupleUsecase.execute(toUserId, true);
    expect(result).toEqual('token');
  });

  it('リクエストが拒否されたとき、nullが返る', async () => {
    const result = await createCoupleUsecase.execute(toUserId, false);
    expect(result).toBeNull();
  });
});
