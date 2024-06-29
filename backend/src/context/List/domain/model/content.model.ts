type ContentType = {
  id: string;
  content: string;
  isDone: boolean;
};

export class ContentModel {
  id: string;
  content: string;
  isDone: boolean;

  private constructor(input: { id: string; content: string; isDone: boolean }) {
    this.id = input.id;
    this.content = input.content;
    this.isDone = input.isDone;
  }

  public static create = (input: ContentType): ContentModel =>
    new ContentModel({
      id: input.id,
      content: input.content,
      isDone: input.isDone,
    });
}
