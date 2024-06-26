import { gen, runSync } from 'effect/Effect';

export type ContentType = {
  id: string;
  content: string;
  isDone: boolean;
};

export class Content {
  id: string;
  content: string;
  isDone: boolean;

  private constructor(input: { id: string; content: string; isDone: boolean }) {
    this.id = input.id;
    this.content = input.content;
    this.isDone = input.isDone;
  }

  public static create = (input: ContentType): Content =>
    gen(function* () {
      return new Content({
        id: input.id,
        content: input.content,
        isDone: input.isDone,
      });
    }).pipe(runSync);
}
