import { Mailaddress } from './valueObject/mailaddress.value';

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

  public static create(input: CoupleType): CoupleModel {
    return new CoupleModel(input);
  }
}
