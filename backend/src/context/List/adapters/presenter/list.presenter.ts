import { Field, ObjectType } from '@nestjs/graphql';

type ListType = {
  id: string;
  name: string;
  coupleId: string;
  isArchived: boolean
};

@ObjectType()
export class ListPresenter {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  coupleId: string;

  @Field()
  isArchived: boolean

  constructor(input: ListType) {
    this.id = input.id;
    this.name = input.name;
    this.coupleId = input.coupleId;
    this.isArchived = input.isArchived;
  }

  static create(input: ListType) {
    return new ListPresenter(input);
  }
}
