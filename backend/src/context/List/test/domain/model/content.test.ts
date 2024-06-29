import { Content } from 'src/context/List/domain/model/content.model';

describe('content value object', () => {
  it('正常系', () => {
    const contentItem = Content.create({
      id: '1',
      content: 'Sample content',
      isDone: false,
    });
    expect(contentItem).toBeInstanceOf(Content);
  });
});
