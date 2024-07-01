import * as crypto from 'crypto';
import { gen } from 'effect/Effect';

type ContentType = {
  id?: string;
  listId: string;
  content: string;
  isDone: boolean;
};

export class ContentsModel {
  id: string;
  listId: string;
  content: string;
  isDone: boolean;

  private constructor(input: {
    id?: string;
    listId: string;
    content: string;
    isDone: boolean;
  }) {
    this.id = input.id;
    this.listId = input.listId;
    this.content = input.content;
    this.isDone = input.isDone;
  }

  public static create = (input: ContentType) =>
    gen(function* () {
      const id = input.id ?? crypto.randomUUID();

      return new ContentsModel({
        id,
        listId: input.listId,
        content: input.content,
        isDone: input.isDone,
      });
    });
}
