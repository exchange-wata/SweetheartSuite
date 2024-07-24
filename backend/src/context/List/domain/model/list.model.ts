import * as crypto from 'crypto';

type ListType = {
  id?: string;
  name: string;
  coupleId: string;
  isArchived?: boolean;
};

export class ListModel {
  id: string;
  name: string;
  coupleId: string;
  isArchived: boolean;

  private constructor(input: {
    id: string;
    name: string;
    coupleId: string;
    isArchived: boolean;
  }) {
    this.id = input.id;
    this.name = input.name;
    this.coupleId = input.coupleId;
    this.isArchived = input.isArchived;
  }

  public static create = (input: ListType) =>
    new ListModel({
      id: input.id ?? crypto.randomUUID(),
      name: input.name,
      coupleId: input.coupleId,
      isArchived: !!input.isArchived,
    });

  public updateName = (name: string) => {
    this.name = name;
    return this;
  };

  public setCompleted = () => {
    this.isArchived = true;
    return this;
  };
}
