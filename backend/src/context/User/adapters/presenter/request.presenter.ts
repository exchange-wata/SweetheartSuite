import { Field, ObjectType } from '@nestjs/graphql';
import { RequestTypeId } from '../../domain/model/valueObject/requestTypeId.value';

type RequestType = {
  id: string;
  fromUserId: string;
  toUserId: string;
  typeId: RequestTypeId;
};

@ObjectType()
export class RequestPresenter {
  @Field()
  id: string;

  @Field()
  fromUserId: string;

  @Field()
  toUserId: string;

  @Field()
  typeId: number;

  constructor(input: RequestType) {
    this.id = input.id;
    this.fromUserId = input.fromUserId;
    this.toUserId = input.toUserId;
    this.typeId = input.typeId.value;
  }

  static create = (input: RequestType) => new RequestPresenter(input);
}
