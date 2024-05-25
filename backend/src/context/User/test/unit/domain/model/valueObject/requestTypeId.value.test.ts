import {
  RequestTypeId,
  RequestTypes,
} from 'src/context/User/domain/model/valueObject/requestTypeId.value';

describe('requestTypeId vo のテスト', () => {
  it('正常系', () => {
    const input = RequestTypes.SENT;
    const { value } = RequestTypeId.create(input);
    expect(value).toBe(input);
  });

  it('異常系', () => {
    const input = 4;
    const value = RequestTypeId.create(input);
    expect(value).toBeNull();
  });
});