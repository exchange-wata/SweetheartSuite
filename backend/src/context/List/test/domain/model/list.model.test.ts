import { runSync } from 'effect/Effect';
import { ListModel } from 'src/context/List/model/list.model';

describe('couple modelのテスト', () => {
  it('正常系', () => {
    const input = {
      id: '7ff7e40a-3040-4119-836d-321c40d1b732',
      name: 'テスト',
      coupleId: 'c2f068b2-57bd-4074-9228-2a13e18141ee',
    };
    expect(runSync(ListModel.create(input))).toBeInstanceOf(ListModel);
  });
});
