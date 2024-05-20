import { Mailaddress } from './valueObject/mailaddress.value';

type UserType = {
  id: string;
  mailaddress: string;
  token: string;
};

export class TempUserModel {
  id: string;
  mailaddress: Mailaddress;
  token: string;

  private constructor(input: UserType) {
    this.id = input.id;
    this.mailaddress = Mailaddress.create(input.mailaddress);
    this.token = input.token;
  }

  public static create(input: UserType): TempUserModel {
    return new TempUserModel(input);
  }
}
