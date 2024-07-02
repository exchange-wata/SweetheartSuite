import * as crypto from 'crypto';

type ListType = {
  id?: string;
  name: string;
  coupleId: string;
};

export class ListModel {
  id: string;
  name: string;
  coupleId: string;

  private constructor(input: { id: string; name: string; coupleId: string }) {
    this.id = input.id;
    this.name = input.name;
    this.coupleId = input.coupleId;
  }

  public static create = (input: ListType) =>
    new ListModel({
      id: input.id ?? crypto.randomUUID(),
      name: input.name,
      coupleId: input.coupleId,
    });

  public updateName = (name: string) => {
    this.name = name;
    return this;
  };
}
