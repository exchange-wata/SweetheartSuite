import { ContentsModel } from 'src/context/List/domain/model/contents.model';

const contentModel = ContentsModel.create({
  id: '1',
  listId: '1',
  content: 'Sample content',
  isDone: false,
});

describe('contents model', () => {
  it('正常系', () => {
    expect(contentModel).toBeInstanceOf(ContentsModel);
  });

  it('contentの更新', () => {
    const updatedContent = 'テスト';

    const updatedListModel = contentModel.updateContent(updatedContent);
    expect(updatedListModel.content).toEqual(updatedContent);
  });

  it('isDoneフラグの更新(完了)', () => {
    const updatedListModel = contentModel.setCompleted();
    expect(updatedListModel.isDone).toBe(true);
  });

  it('isDoneフラグの更新(未完了)', () => {
    const updatedListModel = contentModel.setIncomplete();
    expect(updatedListModel.isDone).toBe(false);
  });
});
