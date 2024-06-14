import { Field, ObjectType } from '@nestjs/graphql';

type ListType = {
  id: string;
  name: string;
  coupleId: string;
};

@ObjectType()
export class ListPresenter {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  coupleId: string;

  constructor(input: ListType) {
    this.id = input.id;
    this.name = input.name;
    this.coupleId = input.coupleId;
  }

  static create(input: ListType) {
    return new ListPresenter(input);
  }
}
