import { ContentModel } from 'src/context/List/domain/model/content.model';

describe('content model', () => {
  it('正常系', () => {
    const contentItem = ContentModel.create({
      id: '1',
      content: 'Sample content',
      isDone: false,
    });
    expect(contentItem).toBeInstanceOf(ContentModel);
  });
});
