export const RequestTypes = {
  SENT: 1,
  APPROVED: 2,
  REJECTED: 3,
} as const;

type RequestTypes = (typeof RequestTypes)[keyof typeof RequestTypes];

const isRequestType = (typeId: number): boolean =>
  (Object.values(RequestTypes) as number[]).includes(typeId);

export class RequestTypeId {
  public readonly value: RequestTypes;

  private constructor(typeId: RequestTypes) {
    this.value = typeId;
  }

  public static create(typeId: number): RequestTypeId | null {
    return isRequestType(typeId)
      ? new RequestTypeId(typeId as RequestTypes)
      : null;
  }
}
