import { Effect } from 'effect';
import { runSync } from 'effect/Effect';
import { CoupleRepositoryInterface } from 'src/context/User/domain/interface/couple.repository.interface';
import { CoupleModel } from 'src/context/User/domain/model/couple.model';
import { GetCoupleUsecase } from 'src/context/User/usecase/getCouple.usecase';

const senderId = '8d946a74-f3e1-464c-8cf5-f180e729892a';
const receiverId = 'c2f068b2-57bd-4074-9228-2a13e18141ee';

const getUsecase = (
  coupleModels: Array<
    Effect.Effect<
      CoupleModel,
      {
        _tag: string;
      }
    >
  >,
) => {
  const couple =
    coupleModels.length > 0 ? Effect.all(coupleModels) : Effect.all([]);

  const coupleRepository: Pick<CoupleRepositoryInterface, 'findByUserId'> = {
    findByUserId: jest.fn(() => couple),
  };

  const usecase = new GetCoupleUsecase(
    coupleRepository as CoupleRepositoryInterface,
  );

  return [coupleRepository, usecase] as const;
};

describe('GetCoupleUsecase', () => {
  it('coupleが一組の時、couple modelが返る', async () => {
    const couple = CoupleModel.create({
      id: '7ff7e40a-3040-4119-836d-321c40d1b732',
      userId1: senderId,
      userId2: receiverId,
    });
    const [coupleRepository, usecase] = getUsecase([couple]);
    const result = await usecase.execute(senderId);

    expect(result).toStrictEqual(runSync(couple));
    expect(coupleRepository.findByUserId).toHaveBeenCalled();
  });

  describe('エラーになる返る時', () => {
    it('coupleが一組もいない時', async () => {
      const [coupleRepository, usecase] = getUsecase([]);

      await expect(() => usecase.execute(senderId)).rejects.toThrow();
      expect(coupleRepository.findByUserId).toHaveBeenCalled();
    });
    it('coupleが二組以上の時', async () => {
      const [coupleRepository, usecase] = getUsecase([
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

      await expect(() => usecase.execute(senderId)).rejects.toThrow();
      expect(coupleRepository.findByUserId).toHaveBeenCalled();
    });
  });
});
