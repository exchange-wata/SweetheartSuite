import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { JwtAuth } from 'src/context/Auth/decorator/jwtAuth.decorator';
import { CreateContentsUsecase } from '../../usecase/createContents.usecase';
import { SetCompletedContentsUsecase } from '../../usecase/setCompletedContents.usecase';
import { UpdateContentsUsecase } from '../../usecase/updateContents.usecase';
import { ContentsPresenter } from '../presenter/contents.presenter';

@Resolver()
@JwtAuth()
export class ContentsResolver {
  constructor(
    private readonly createContentsUsecase: CreateContentsUsecase,
    private readonly updateContentsUsecase: UpdateContentsUsecase,
    private readonly setCompletedContentsUsecase: SetCompletedContentsUsecase,
  ) {}

  @Mutation(() => ContentsPresenter)
  async createContents(
    @Args('listId') listId: string,
    @Args('content') content: string,
  ) {
    const contents = await this.createContentsUsecase.execute(listId, content);
    return ContentsPresenter.create(contents);
  }

  @Mutation(() => ContentsPresenter)
  async updateContents(
    @Args('id') id: string,
    @Args('content') content: string,
  ) {
    const contents = await this.updateContentsUsecase.execute(id, content);
    return ContentsPresenter.create(contents);
  }

  @Mutation(() => ContentsPresenter)
  async updateContentsFlag(
    @Args('id') id: string,
    @Args('isDone') isDone: boolean,
  ) {
    const contents = await this.setCompletedContentsUsecase.execute(id, isDone);
    return ContentsPresenter.create(contents);
  }
}
