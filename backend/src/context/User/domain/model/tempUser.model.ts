import { runSync } from 'effect/Effect';
import { gen } from 'effect/Either';
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

  constructor(input: TempUserType) {}

  public static create(input: TempUserType): TempUserModel {
    const result = gen(function* () {
      const mailaddress = runSync(Mailaddress.create(input.mailaddress));
      const inputModel = {
        id: input.id,
        mailaddress: mailaddress.value,
        token: input.token,
      };

      return new TempUserModel(inputModel);
    });

    return runSync(result);
  }
}
