import * as crypto from 'crypto';

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
    this.id = input.id ?? crypto.randomUUID();
    this.listId = input.listId;
    this.content = input.content;
    this.isDone = input.isDone;
  }

  public static create = (input: ContentType) =>
    new ContentsModel({
      id: input.id ?? crypto.randomUUID(),
      listId: input.listId,
      content: input.content,
      isDone: input.isDone,
    });

  public updateContent = (content: string) => {
    this.content = content;
    return this;
  };

  public setCompleted = () => {
    this.isDone = true;
    return this;
  };

  public setIncomplete = () => {
    this.isDone = false;
    return this;
  };
}
