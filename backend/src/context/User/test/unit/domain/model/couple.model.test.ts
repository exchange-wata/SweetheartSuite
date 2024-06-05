import { runSync } from 'effect/Effect';
import { CoupleModel } from 'src/context/User/domain/model/couple.model';

describe('couple modelのテスト', () => {
  it('正常系', () => {
    const input = {
      id: '7ff7e40a-3040-4119-836d-321c40d1b732',
      userId1: 'b6ac4860-21aa-43c7-bbcd-f8a47b86b362',
      userId2: 'c2f068b2-57bd-4074-9228-2a13e18141ee',
    };
    expect(runSync(CoupleModel.create(input))).toBeInstanceOf(CoupleModel);
  });

  describe('異常系', () => {
    it('ユーザーが同一人物の時、エラーになる', () => {
      const input = {
        id: '7ff7e40a-3040-4119-836d-321c40d1b732',
        userId1: 'b6ac4860-21aa-43c7-bbcd-f8a47b86b362',
        userId2: 'b6ac4860-21aa-43c7-bbcd-f8a47b86b362',
      };
      expect(() => runSync(CoupleModel.create(input))).toThrow(
        'invalid same user ids',
      );
    });
  });
});
