import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { JwtAuth } from 'src/context/Auth/decorator/jwtAuth.decorator';
import { CreateContentsUsecase } from '../../usecase/createContents.usecase';
import { ContentsPresenter } from '../presenter/contents.presenter';

@Resolver()
@JwtAuth()
export class ContentsResolver {
  constructor(private readonly createContentsUsecase: CreateContentsUsecase) {}

  @Mutation(() => ContentsPresenter)
  async createContents(
    @Args('listId') listId: string,
    @Args('content') content: string,
    @Args('isDone') isDone: boolean,
  ) {
    const contents = await this.createContentsUsecase.execute(
      listId,
      content,
      isDone,
    );
    return ContentsPresenter.create(contents);
  }
}
