import { Test, TestingModule } from '@nestjs/testing';
import {
  REQUEST_REPOSITORY,
  COUPLE_REPOSITORY,
} from 'src/context/User/const/user.token';
import { CoupleRepositoryInterface } from 'src/context/User/domain/interface/couple.repository.interface';
import { RequestRepositoryInterface } from 'src/context/User/domain/interface/request.repository.interface';
import { CoupleModel } from 'src/context/User/domain/model/couple.model';
import { RequestTypes } from 'src/context/User/domain/model/valueObject/requestTypeId.value';
import { CreateCoupleUsecase } from 'src/context/User/usecase/createCouple.usecase';

describe('CreateCoupleUsecase', () => {
  let createCoupleUsecase: CreateCoupleUsecase;
  let requestRepository: RequestRepositoryInterface;
  let coupleRepository: CoupleRepositoryInterface;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateCoupleUsecase,
        {
          provide: REQUEST_REPOSITORY,
          useValue: {
            update: jest.fn(),
          },
        },
        {
          provide: COUPLE_REPOSITORY,
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    createCoupleUsecase = module.get<CreateCoupleUsecase>(CreateCoupleUsecase);
    requestRepository =
      module.get<RequestRepositoryInterface>(REQUEST_REPOSITORY);
    coupleRepository = module.get<CoupleRepositoryInterface>(COUPLE_REPOSITORY);
  });

  it('リクエストが承認されたとき、couple modelが返る', async () => {
    const receiverId = 'receiver-id';
    const request = {
      fromUserId: 'user1',
      toUserId: 'user2',
    };
    const couple = CoupleModel.create({
      id: 'test',
      userId1: 'user1',
      userId2: 'user2',
    });

    (requestRepository.update as jest.Mock).mockResolvedValue(request);
    (coupleRepository.create as jest.Mock).mockResolvedValue(couple);

    const result = await createCoupleUsecase.execute(receiverId, true);

    expect(requestRepository.update).toHaveBeenCalledWith(
      receiverId,
      RequestTypes.APPROVED,
    );
    expect(coupleRepository.create).toHaveBeenCalled();
    expect(result).toBe(couple);
  });

  it('リクエストが拒否されたとき、nullが返る', async () => {
    const receiverId = 'receiver-id';

    (requestRepository.update as jest.Mock).mockResolvedValue(null);

    const result = await createCoupleUsecase.execute(receiverId, false);

    expect(requestRepository.update).toHaveBeenCalledWith(
      receiverId,
      RequestTypes.REJECTED,
    );
    expect(coupleRepository.create).not.toHaveBeenCalled();
    expect(result).toBeNull();
  });
});
