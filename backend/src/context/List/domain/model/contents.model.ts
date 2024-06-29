type ContentType = {
  id: string;
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
    id: string;
    listId: string;
    content: string;
    isDone: boolean;
  }) {
    this.id = input.id;
    this.listId = input.listId;
    this.content = input.content;
    this.isDone = input.isDone;
  }

  public static create = (input: ContentType): ContentsModel =>
    new ContentsModel({
      id: input.id,
      listId: input.listId,
      content: input.content,
      isDone: input.isDone,
    });
}
