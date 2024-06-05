import { runSync } from 'effect/Effect';
import { RequestModel } from 'src/context/User/domain/model/request.model';
import { RequestTypes } from 'src/context/User/domain/model/valueObject/requestTypeId.value';

describe('request modelのテスト', () => {
  it('正常系', () => {
    const input = {
      id: '7ff7e40a-3040-4119-836d-321c40d1b732',
      fromUserId: 'b6ac4860-21aa-43c7-bbcd-f8a47b86b362',
      toUserId: 'c2f068b2-57bd-4074-9228-2a13e18141ee',
      typeId: RequestTypes.SENT,
    };
    expect(runSync(RequestModel.create(input))).toBeInstanceOf(RequestModel);
  });

  describe('異常系', () => {
    it('ユーザーが同一人物の時、エラーになる', () => {
      const input = {
        id: '7ff7e40a-3040-4119-836d-321c40d1b732',
        fromUserId: 'b6ac4860-21aa-43c7-bbcd-f8a47b86b362',
        toUserId: 'b6ac4860-21aa-43c7-bbcd-f8a47b86b362',
        typeId: RequestTypes.SENT,
      };
      expect(() => runSync(RequestModel.create(input))).toThrow(
        'invalid same user ids',
      );
    });
  });
});
