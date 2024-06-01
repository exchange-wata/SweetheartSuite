import { gen, runSync } from 'effect/Effect';
import { Mailaddress } from './valueObject/mailaddress.value';

type UserType = {
  id: string;
  name: string;
  mailaddress: string;
};

export class UserModel {
  id: string;
  name: string;
  mailaddress: Mailaddress;

  private constructor(input: {
    id: string;
    name: string;
    mailaddress: Mailaddress;
  }) {
    (this.id = input.id), (this.name = input.name);
    this.mailaddress = input.mailaddress;
  }

  public static create = (input: UserType): UserModel =>
    gen(function* () {
      const mailaddress = yield* Mailaddress.create(input.mailaddress);
      return new UserModel({
        id: input.id,
        name: input.name,
        mailaddress,
      });
    }).pipe(runSync);
}
