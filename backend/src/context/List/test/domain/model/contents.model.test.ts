import { ContentsModel } from 'src/context/List/domain/model/contents.model';

describe('contents model', () => {
  it('正常系', () => {
    const contentItem = ContentsModel.create({
      id: '1',
      listId: '1',
      content: 'Sample content',
      isDone: false,
    });

    expect(contentItem).toBeInstanceOf(ContentsModel);
  });

  it('contentの更新', () => {
    const contentModel = ContentsModel.create({
      id: '1',
      listId: '1',
      content: 'Sample content',
      isDone: false,
    });
    const updatedContent = 'テスト';

    const updatedListModel = contentModel.updateContent(updatedContent);
    expect(updatedListModel.content).toEqual(updatedContent);
  });
});
