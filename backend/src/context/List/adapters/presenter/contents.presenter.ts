import { Field, ObjectType } from '@nestjs/graphql';

type ContentsType = {
  id: string;
  listId: string;
  content: string;
  isDone: boolean;
};

@ObjectType()
export class ContentsPresenter {
  @Field()
  id: string;

  @Field()
  listId: string;

  @Field()
  content: string;

  @Field()
  isDone: boolean;

  constructor(input: ContentsType) {
    this.id = input.id;
    this.listId = input.listId;
    this.content = input.content;
    this.isDone = input.isDone;
  }

  static create(input: ContentsType) {
    return new ContentsPresenter(input);
  }
}
