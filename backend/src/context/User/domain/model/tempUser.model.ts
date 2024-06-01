import { gen, runSync } from 'effect/Effect';
import { Mailaddress } from './valueObject/mailaddress.value';

type TempUserType = {
  id: string;
  mailaddress: string;
  token: string;
};

export class TempUserModel {
  id: string;
  mailaddress: Mailaddress;
  token: string;

  constructor(input: { id: string; mailaddress: Mailaddress; token: string }) {
    this.id = input.id;
    this.mailaddress = input.mailaddress;
    this.token = input.token;
  }

  public static create = (input: TempUserType): TempUserModel =>
    gen(function* () {
      const mailaddress = yield* Mailaddress.create(input.mailaddress);
      return new TempUserModel({
        id: input.id,
        mailaddress,
        token: input.token,
      });
    }).pipe(runSync);
}
