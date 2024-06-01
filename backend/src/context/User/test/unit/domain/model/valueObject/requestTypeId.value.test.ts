import { runSync } from 'effect/Effect';
import {
  RequestTypeId,
  RequestTypes,
} from 'src/context/User/domain/model/valueObject/requestTypeId.value';

describe('requestTypeId vo のテスト', () => {
  it('正常系', () => {
    const input = RequestTypes.SENT;
    const typeId = RequestTypeId.create(input);
    expect(runSync(typeId).value).toBe(input);
  });

  it('異常系', () => {
    const input = 4;
    expect(() => runSync(RequestTypeId.create(input))).toThrow(
      'Invalid request type id',
    );
  });
});
