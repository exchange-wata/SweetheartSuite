import { Effect, fail, succeed } from 'effect/Effect';

export class Mailaddress {
  public readonly value: string;

  private constructor(mailaddress: string) {
    this.value = mailaddress;
  }

  public static create(
    mailaddress: string,
  ): Effect<Mailaddress, { _tag: string }> {
    return this.isValidMailaddress(mailaddress)
      ? succeed(new Mailaddress(mailaddress))
      : fail({ _tag: 'Invalid email address' } as const);
  }

  private static isValidMailaddress(mailaddress: string): boolean {
    const mailaddressRegex =
      /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/;
    return mailaddressRegex.test(mailaddress);
  }
}
