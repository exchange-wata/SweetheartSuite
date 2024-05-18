import { Mailaddress } from './valueObject/mailaddress.value';

type UserType = {
  id: number;
  name: string;
  mailaddress: string;
};

export class UserModel {
  id: number;
  name: string;
  mailaddress: Mailaddress;

  private constructor(input: UserType) {
    this.id = input.id;
    this.name = input.name;
    this.mailaddress = Mailaddress.create(input.mailaddress);
  }

  public static create(input: UserType): UserModel {
    return new UserModel(input);
  }
}
