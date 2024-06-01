import { ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Effect } from 'effect';
import { UserModel } from 'src/context/User/domain/model/user.model';
import { JwtAuthGuard } from '../../guard/jwtAuth.guard';
import { JwtAuthUsecase } from '../../usecase/jwtAuth.usecase';

describe('JwtAuthGuard', () => {
  const mockExecutionContext: Partial<ExecutionContext> = {
    switchToHttp: jest.fn(),
  };

  it('tokenが正しいとき、trueが返る', async () => {
    const user = UserModel.create({
      id: 'test-id',
      name: 'test-name',
      mailaddress: 'test@example.com',
    });

    const mockGqlExecutionContext = {
      create: jest.fn().mockReturnValue({
        getContext: jest.fn().mockReturnValue({
          req: {
            headers: {
              authorization: 'Bearer valid-token',
            },
          },
        }),
      }),
    };
    jest
      .spyOn(GqlExecutionContext, 'create')
      .mockReturnValue(mockGqlExecutionContext.create());
    const jwtAuthUsecase: Pick<JwtAuthUsecase, 'verifyToken'> = {
      verifyToken: jest.fn(() => Effect.succeed(user)),
    };
    const guard = new JwtAuthGuard(jwtAuthUsecase as JwtAuthUsecase);

    const result = await guard.canActivate(
      mockExecutionContext as ExecutionContext,
    );
    expect(result).toBe(true);
  });

  it('Bearerが存在しない時、エラーになる', async () => {
    const mockGqlExecutionContext = {
      create: jest.fn().mockReturnValue({
        getContext: jest.fn().mockReturnValue({
          req: {
            headers: {
              authorization: '',
            },
          },
        }),
      }),
    };

    jest
      .spyOn(GqlExecutionContext, 'create')
      .mockReturnValue(mockGqlExecutionContext.create());

    const jwtAuthUsecase: Pick<JwtAuthUsecase, 'verifyToken'> = {
      verifyToken: jest.fn(() => Effect.succeed({})),
    };
    const guard = new JwtAuthGuard(jwtAuthUsecase as JwtAuthUsecase);

    await expect(guard.canActivate({} as ExecutionContext)).rejects.toThrow(
      'UnauthorizedException',
    );
  });
});
