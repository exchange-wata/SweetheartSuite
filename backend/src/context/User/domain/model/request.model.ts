import { gen, runSync } from 'effect/Effect';
import { RequestTypeId } from './valueObject/requestTypeId.value';

type CoupleType = {
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

  public static create = (input: CoupleType): RequestModel =>
    gen(function* () {
      const typeId = yield* RequestTypeId.create(input.typeId);
      return new RequestModel({
        id: input.id,
        fromUserId: input.fromUserId,
        toUserId: input.toUserId,
        typeId,
      });
    }).pipe(runSync);
}
