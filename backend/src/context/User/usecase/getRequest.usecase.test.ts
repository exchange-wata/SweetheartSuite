import { runSync } from 'effect/Effect';
import { RequestRepositoryInterface } from '../domain/interface/request.repository.interface';
import { RequestModel } from '../domain/model/request.model';
import { RequestTypes } from '../domain/model/valueObject/requestTypeId.value';
import { RequestRepository } from '../infra/request.repository';
import { GetRequestUsecase } from './getRequest.usecase';

const toUserId = '10d7f226-a927-40fa-9259-2793b607a212';
const request = RequestModel.create({
  id: '0ef650d7-6a48-4395-954c-6770c21e34bb',
  fromUserId: 'be80da95-5f84-4d26-8829-4beb86d3638c',
  toUserId,
  typeId: RequestTypes.SENT,
});

const requestRepository: Pick<RequestRepository, 'findByToUserIdAndTypeId'> = {
  findByToUserIdAndTypeId: jest.fn(() => request),
};

const usecase = new GetRequestUsecase(
  requestRepository as RequestRepositoryInterface,
);

describe('GetRequestUsecase', () => {
  it('正常系', async () => {
    const result = await usecase.execute(toUserId, RequestTypes.SENT);

    expect(result).toStrictEqual(runSync(request));
    expect(requestRepository.findByToUserIdAndTypeId).toHaveBeenCalled();
  });
});
