import { Effect } from 'effect';
import { gen, runSync } from 'effect/Effect';
import { RequestTypeId } from './valueObject/requestTypeId.value';

type RequestType = {
  id: string;
  fromUserId: string;
  toUserId: string;
  typeId: number;
};

export class RequestModel {
  id: string;
  fromUserId: string;
  toUserId: string;
  typeId: RequestTypeId;

  private constructor(input: {
    id: string;
    fromUserId: string;
    toUserId: string;
    typeId: RequestTypeId;
  }) {
    this.id = input.id;
    this.fromUserId = input.fromUserId;
    this.toUserId = input.toUserId;
    this.typeId = input.typeId;
  }

  public static create = (input: RequestType): RequestModel =>
    gen(function* () {
      const typeId = yield* RequestTypeId.create(input.typeId);
      const userIds = yield* RequestModel.checkIds(input);
      return new RequestModel({
        id: input.id,
        fromUserId: userIds.fromUserId,
        toUserId: userIds.toUserId,
        typeId,
      });
    }).pipe(runSync);

  private static checkIds = (
    input: Pick<RequestType, 'fromUserId' | 'toUserId'>,
  ) =>
    input.fromUserId !== input.toUserId
      ? Effect.succeed(input)
      : Effect.fail({ _tag: 'invalid user ids' });
}
