enum RequestTypes {
  SENT = 1,
  APPROVED = 2,
  REJECTED = 3,
}

export class RequestTypeId {
  public readonly value: RequestTypes;

  private constructor(typeId: RequestTypes) {
    this.value = typeId;
  }

  public static create(typeId: number): RequestTypeId {
    return new RequestTypeId(typeId);
  }
}
