import { Effect } from 'effect';

export const RequestTypes = {
  SENT: 1,
  APPROVED: 2,
  REJECTED: 3,
} as const;

export type RequestTypes = (typeof RequestTypes)[keyof typeof RequestTypes];

const isRequestType = (typeId: number): typeId is RequestTypes =>
  (Object.values(RequestTypes) as number[]).includes(typeId);

export class RequestTypeId {
  public readonly value: RequestTypes;

  private constructor(typeId: RequestTypes) {
    this.value = typeId;
  }

  public static create = (typeId: number) =>
    isRequestType(typeId)
      ? Effect.succeed(new RequestTypeId(typeId))
      : Effect.fail({ _tag: 'Invalid request type id' } as const);
}
