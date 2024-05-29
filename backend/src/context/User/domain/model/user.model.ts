import { runSync } from 'effect/Effect';
import { gen } from 'effect/Either';
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

  private constructor(input: UserType) {}

  public static create(input: UserType): UserModel {
    // FIXME* unknownがいいかわからない
    // const result: Either<UserModel, unknown>
    const result = gen(function* () {
      const mailaddress = runSync(Mailaddress.create(input.mailaddress));
      const inputModel = {
        id: input.id,
        name: input.name,
        mailaddress: mailaddress.value,
      };
      return new UserModel(inputModel);
    });

    return runSync(result);
  }
}
