import { ObjectType, Field } from '@nestjs/graphql';
import { Mailaddress } from '../../domain/model/valueObject/mailaddress.value';

type TempUserType = {
  id: string;
  mailaddress: Mailaddress;
  token: string;
};

@ObjectType()
export class TempUserPresenter {
  @Field()
  id: string;

  @Field()
  mailaddress: string;

  @Field()
  token: string;

  constructor(input: TempUserType) {
    this.id = input.id;
    this.mailaddress = input.mailaddress.value;
    this.token = input.token;
  }

  static create(input: TempUserType) {
    return new TempUserPresenter(input);
  }
}
