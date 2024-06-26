import * as crypto from 'crypto';
import { gen } from 'effect/Effect';
import { Content, ContentType } from './valueObject/content.value';

type ListType = {
  id?: string;
  name: string;
  coupleId: string;
  contents?: ContentType[];
};

export class ListModel {
  id: string;
  name: string;
  coupleId: string;
  contents: Content[];

  private constructor(input: {
    id: string;
    name: string;
    coupleId: string;
    contents: Content[];
  }) {
    this.id = input.id;
    this.name = input.name;
    this.coupleId = input.coupleId;
    this.contents = input.contents;
  }

  public static create = (input: ListType) =>
    gen(function* () {
      const id = input.id ?? crypto.randomUUID();
      const contents = input.contents
        ? input.contents.map((content) => Content.create(content))
        : [];
      return new ListModel({
        id,
        name: input.name,
        coupleId: input.coupleId,
        contents,
      });
    });

  public updateName = (name: string) => {
    this.name = name;
    return this;
  };
}
