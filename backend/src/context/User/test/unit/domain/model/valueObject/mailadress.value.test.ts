import { Mailaddress } from '../../../../../domain/model/valueObject/mailaddress.value';

describe('mailaddress vo のテスト', () => {
  it('正常系', () => {
    const input = 'aA0_.+-@example.com';
    const { mailaddress } = Mailaddress.create(input);
    expect(mailaddress).toBe(input);
  });

  describe('異常系', () => {
    it.each([
      ['ドメイン不足', 'test@example'],
      ['トップレベルでのドメイン不足', 'test@example.'],
      ['不正なアンダースコア', 'test@exa_mple.com'],
      ['不正な特殊文字', 'test@exa!mple.com'],
      ['連続するドット', 'test@example..com'],
      ['末尾にドット', 'test@example.com.'],
    ])('%s', (_, mailaddress) => {
      expect(() => Mailaddress.create(mailaddress)).toThrow(
        'Invalid email address',
      );
    });
  });
});
