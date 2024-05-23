import { Mailaddress } from './valueObject/mailaddress.value';
import { RequestTypeId } from './valueObject/requestTypeId.value';

type CoupleType = {
  id: string;
  from: string;
  to: string;
  typeId: number;
};

export class RequestModel {
  id: string;
  from: string;
  to: string;
  typeId: RequestTypeId;

  private constructor(input: CoupleType) {
    this.id = input.id;
    this.from = input.from;
    this.to = input.to;
    this.typeId = RequestTypeId.create(input.typeId);
  }

  public static create(input: CoupleType): RequestModel {
    return new RequestModel(input);
  }
}
