import * as crypto from 'crypto';
import { gen } from 'effect/Effect';

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
    gen(function* () {
      const id = input.id ?? crypto.randomUUID();
      return new ListModel({
        id,
        name: input.name,
        coupleId: input.coupleId,
      });
    });
}
