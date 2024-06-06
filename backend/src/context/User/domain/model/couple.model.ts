import * as crypto from 'crypto';
import { Effect } from 'effect';
import { gen } from 'effect/Effect';

type CoupleType = {
  id?: string;
  userId1: string;
  userId2: string;
};

export class CoupleModel {
  id: string;
  userId1: string;
  userId2: string;

  private constructor(input: CoupleType) {
    this.id = input.id;
    this.userId1 = input.userId1;
    this.userId2 = input.userId2;
  }

  public static create = (input: CoupleType) =>
    gen(function* () {
      const id = input.id ?? crypto.randomUUID();
      const userIds = yield* CoupleModel.confirmDifferentUserIds(input);
      return new CoupleModel({
        id,
        userId1: userIds.userId1,
        userId2: userIds.userId2,
      });
    });

  private static confirmDifferentUserIds = (
    input: Pick<CoupleType, 'userId1' | 'userId2'>,
  ) =>
    input.userId1 !== input.userId2
      ? Effect.succeed(input)
      : Effect.fail({ _tag: 'invalid same user ids' } as const);
}
