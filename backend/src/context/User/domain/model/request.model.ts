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

  private constructor(input: CoupleType) {
    this.id = input.id;
    this.fromUserId = input.fromUserId;
    this.toUserId = input.toUserId;
    this.typeId = RequestTypeId.create(input.typeId);
  }

  public static create(input: CoupleType): RequestModel {
    return new RequestModel(input);
  }
}
