import { Effect } from 'effect';
import { gen } from 'effect/Effect';
import { RequestTypeId } from './valueObject/requestTypeId.value';

type RequestType = {
  id?: string;
  fromUserId: string;
  toUserId: string;
  typeId: number;
};

const crypto = require('crypto');

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

  public static create = (
    input: RequestType,
  ): Effect.Effect<RequestModel, { _tag: string }> =>
    gen(function* () {
      const id = input.id ?? crypto.randomUUID();
      const typeId = yield* RequestTypeId.create(input.typeId);
      const userIds = yield* RequestModel.confirmDifferentUserIds(input);
      return new RequestModel({
        id,
        fromUserId: userIds.fromUserId,
        toUserId: userIds.toUserId,
        typeId,
      });
    });

  private static confirmDifferentUserIds = (
    input: Pick<RequestType, 'fromUserId' | 'toUserId'>,
  ) =>
    input.fromUserId !== input.toUserId
      ? Effect.succeed(input)
      : Effect.fail({ _tag: 'invalid same user ids' });
}
