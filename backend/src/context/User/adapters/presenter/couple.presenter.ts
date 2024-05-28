import { ObjectType, Field } from '@nestjs/graphql';

type CoupleType = {
  id: string;
  userId1: string;
  userId2: string;
};

@ObjectType()
export class CouplePresenter {
  @Field()
  id: string;

  @Field()
  userId1: string;

  @Field()
  userId2: string;

  constructor(input: CoupleType) {
    this.id = input.id;
    this.userId1 = input.userId1;
    this.userId2 = input.userId2;
  }

  static create(input: CoupleType) {
    return new CouplePresenter(input);
  }
}
