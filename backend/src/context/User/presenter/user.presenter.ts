import { ObjectType, Field } from '@nestjs/graphql';
import { Mailaddress } from '../domain/model/valueObject/mailaddress.value';

type UserType = {
  id: string;
  name: string;
  mailaddress: Mailaddress;
};

@ObjectType()
export class UserPresenter {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  mailaddress: string;

  constructor(input: UserType) {
    (this.id = input.id),
      (this.name = input.name),
      (this.mailaddress = input.mailaddress.value);
  }

  static create(input: UserType) {
    return new UserPresenter(input);
  }
}
