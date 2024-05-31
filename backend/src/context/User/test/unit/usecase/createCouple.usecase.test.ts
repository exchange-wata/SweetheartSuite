import { Effect } from 'effect';
import { RequestRepositoryInterface } from 'src/context/User/domain/interface/request.repository.interface';
import { CoupleModel } from 'src/context/User/domain/model/couple.model';
import { RequestModel } from 'src/context/User/domain/model/request.model';
import { RequestTypes } from 'src/context/User/domain/model/valueObject/requestTypeId.value';
import { CoupleRepository } from 'src/context/User/infra/couple.repository';
import { RequestRepository } from 'src/context/User/infra/request.repository';
import { CreateCoupleUsecase } from 'src/context/User/usecase/createCouple.usecase';

const request = RequestModel.create({
  id: 'request-id',
  fromUserId: 'sender-id',
  toUserId: 'receiver-id',
  typeId: RequestTypes.APPROVED,
});
const couple = CoupleModel.create({
  id: 'couple-id',
  userId1: 'from-user-id',
  userId2: 'to-user-id',
});

const requestRepository: Pick<RequestRepositoryInterface, 'update'> = {
  update: jest.fn(() => Effect.succeed(request)),
};
const coupleRepository: Pick<CoupleRepository, 'create'> = {
  create: jest.fn(() => Effect.succeed(couple)),
};

const createCoupleUsecase = new CreateCoupleUsecase(
  requestRepository as RequestRepository,
  coupleRepository as CoupleRepository,
);

describe('CreateCoupleUsecase', () => {
  it('リクエストが承認されたとき、couple modelが返る', async () => {
    const receiverId = 'receiver-id';

    const result = await createCoupleUsecase.execute(receiverId, true);

    expect(requestRepository.update).toHaveBeenCalled();
    expect(coupleRepository.create).toHaveBeenCalled();
    expect(result).toBe(couple);
  });

  it('リクエストが拒否されたとき、nullが返る', async () => {
    const receiverId = 'receiver-id';

    const result = await createCoupleUsecase.execute(receiverId, false);

    expect(requestRepository.update).toHaveBeenCalled();
    expect(coupleRepository.create).toHaveBeenCalled();
    expect(result).toBeNull();
  });
});
