import { UnauthorizedException } from '@nestjs/common';
import { ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Test, TestingModule } from '@nestjs/testing';
import { JwtAuthGuard } from '../../guard/jwtAuth.guard';
import { JwtAuthUsecase } from '../../usecase/jwtAuth.usecase';

describe('JwtAuthGuard', () => {
  let guard: JwtAuthGuard;
  let usecase: JwtAuthUsecase;

  const mockExecutionContext: Partial<ExecutionContext> = {
    switchToHttp: jest.fn(),
  };

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

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JwtAuthGuard,
        {
          provide: JwtAuthUsecase,
          useValue: {
            verifyToken: jest.fn(),
          },
        },
      ],
    }).compile();

    guard = module.get<JwtAuthGuard>(JwtAuthGuard);
    usecase = module.get<JwtAuthUsecase>(JwtAuthUsecase);
  });

  it('tokenが正しいとき、trueが返る', async () => {
    jest
      .spyOn(GqlExecutionContext, 'create')
      .mockReturnValue(mockGqlExecutionContext.create());
    usecase.verifyToken = jest.fn().mockResolvedValue({ userId: 1 });

    const result = await guard.canActivate(
      mockExecutionContext as ExecutionContext,
    );
    expect(result).toBe(true);
  });

  it('tokenが不明な時、エラーになる', async () => {
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

    await expect(guard.canActivate({} as ExecutionContext)).rejects.toThrow(
      UnauthorizedException,
    );
  });

  it('tokenが無効な時、エラーになる', async () => {
    jest
      .spyOn(GqlExecutionContext, 'create')
      .mockReturnValue(mockGqlExecutionContext.create());
    usecase.verifyToken = jest
      .fn()
      .mockRejectedValue(new Error('Invalid token'));

    await expect(
      guard.canActivate(mockExecutionContext as ExecutionContext),
    ).rejects.toThrow(UnauthorizedException);
  });
});
