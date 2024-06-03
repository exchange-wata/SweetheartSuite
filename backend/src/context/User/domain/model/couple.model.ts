import { Effect } from 'effect';
import { gen, runSync } from 'effect/Effect';

type CoupleType = {
  id: string;
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

  public static create = (input: CoupleType): CoupleModel =>
    gen(function* () {
      const userIds = yield* CoupleModel.confirmDifferentUserIds(input);
      return new CoupleModel({
        id: input.id,
        userId1: userIds.userId1,
        userId2: userIds.userId2,
      });
    }).pipe(runSync);

  private static confirmDifferentUserIds = (
    input: Pick<CoupleType, 'userId1' | 'userId2'>,
  ) =>
    input.userId1 !== input.userId2
      ? Effect.succeed(input)
      : Effect.fail({ _tag: 'invalid user ids' } as const);
}
