import { Effect } from 'effect';
import { CoupleRepositoryInterface } from 'src/context/User/domain/interface/couple.repository.interface';
import { CoupleModel } from 'src/context/User/domain/model/couple.model';
import { GetCoupleUsecase } from 'src/context/User/usecase/getCouple.usecase';

const senderId = '8d946a74-f3e1-464c-8cf5-f180e729892a';
const receiverId = 'c2f068b2-57bd-4074-9228-2a13e18141ee';

const couple = Effect.all([
  CoupleModel.create({
    id: '7ff7e40a-3040-4119-836d-321c40d1b732',
    userId1: senderId,
    userId2: receiverId,
  }),
]);
const coupleRepository: Pick<CoupleRepositoryInterface, 'findByUserId'> = {
  findByUserId: jest.fn(() => couple),
};

const usecase = new GetCoupleUsecase(
  coupleRepository as CoupleRepositoryInterface,
);

describe('GetCoupleUsecase', () => {
  it('coupleが一組の時、trueが返る', async () => {
    const result = await usecase.execute(senderId);

    expect(result).toBe(true);
    expect(coupleRepository.findByUserId).toHaveBeenCalled();
  });

  describe('falseが返る時', () => {
    it('coupleが一組もいない時', async () => {
      const couple = Effect.all([]);
      const coupleRepository: Pick<CoupleRepositoryInterface, 'findByUserId'> =
        {
          findByUserId: jest.fn(() => couple),
        };

      const usecase = new GetCoupleUsecase(
        coupleRepository as CoupleRepositoryInterface,
      );

      const result = await usecase.execute(senderId);

      expect(result).toBe(false);
      expect(coupleRepository.findByUserId).toHaveBeenCalled();
    });
    it('coupleが二組以上の時', async () => {
      const couple = Effect.all([
        CoupleModel.create({
          id: '7ff7e40a-3040-4119-836d-321c40d1b732',
          userId1: senderId,
          userId2: receiverId,
        }),
        CoupleModel.create({
          id: '7ff7e40a-3040-4119-836d-321c40d1b732',
          userId1: senderId,
          userId2: receiverId,
        }),
      ]);
      const coupleRepository: Pick<CoupleRepositoryInterface, 'findByUserId'> =
        {
          findByUserId: jest.fn(() => couple),
        };

      const usecase = new GetCoupleUsecase(
        coupleRepository as CoupleRepositoryInterface,
      );

      const result = await usecase.execute(senderId);

      expect(result).toBe(false);
      expect(coupleRepository.findByUserId).toHaveBeenCalled();
    });
  });
});
