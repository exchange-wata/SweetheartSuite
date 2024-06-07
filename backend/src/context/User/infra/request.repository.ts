import { Injectable } from '@nestjs/common';
import { pipe } from 'effect';
import { andThen, tryPromise } from 'effect/Effect';
import { PrismaService } from 'src/prisma/prisma.service';
import { RequestErrorMessage } from '../const/errorMessage/request.errorMessage';
import { RequestRepositoryInterface } from '../domain/interface/request.repository.interface';
import { RequestModel } from '../domain/model/request.model';
import { RequestTypes } from '../domain/model/valueObject/requestTypeId.value';

@Injectable()
export class RequestRepository implements RequestRepositoryInterface {
  constructor(private readonly prisma: PrismaService) {}

  create = (request: RequestModel) =>
    pipe(
      tryPromise({
        try: () =>
          this.prisma.request.create({
            data: {
              id: request.id,
              fromUserId: request.fromUserId,
              toUserId: request.toUserId,
              typeId: request.typeId.value,
            },
          }),
        catch: () => ({ _tag: RequestErrorMessage.CREATE }) as const,
      }),
      andThen(RequestModel.create),
    );

  update = (request: RequestModel) =>
    pipe(
      tryPromise({
        try: () =>
          this.prisma.request.update({
            where: {
              toUserId: request.toUserId,
            },
            data: {
              typeId: request.typeId.value,
              updatedAt: new Date(),
              deletedAt: new Date(),
            },
          }),
        catch: () => ({ _tag: RequestErrorMessage.UPDATE }) as const,
      }),
      andThen(RequestModel.create),
    );

  findByToUserId = (toUserId: string) =>
    pipe(
      tryPromise({
        try: () =>
          this.prisma.request.findUniqueOrThrow({ where: { toUserId } }),
        catch: () =>
          ({ _tag: RequestErrorMessage.FIND_BY_TO_USER_ID }) as const,
      }),
      andThen(RequestModel.create),
    );

  findByToUserIdAndTypeId = (toUserId: string, typeId: RequestTypes) =>
    pipe(
      tryPromise({
        try: () =>
          this.prisma.request.findUniqueOrThrow({
            where: { toUserId, typeId },
          }),
        catch: () =>
          ({
            _tag: RequestErrorMessage.FIND_BY_TO_USER_ID_AND_TYPE_ID,
          }) as const,
      }),
      andThen(RequestModel.create),
    );
}
