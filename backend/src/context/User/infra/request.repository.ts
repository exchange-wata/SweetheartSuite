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

  create = (fromUserId: string, toUserId: string) =>
    pipe(
      tryPromise({
        try: () =>
          this.prisma.request.create({
            data: { fromUserId, toUserId, typeId: RequestTypes.SENT },
          }),
        catch: () => ({ _tag: RequestErrorMessage.CREATE }) as const,
      }),
      andThen(RequestModel.create),
    );

  update = (toUserId: string, typeId: RequestTypes) =>
    pipe(
      tryPromise({
        try: () =>
          this.prisma.request.update({
            where: {
              toUserId,
            },
            data: {
              typeId,
              updatedAt: new Date(),
              deletedAt: new Date(),
            },
          }),
        catch: () => ({ _tag: RequestErrorMessage.UPDATE }) as const,
      }),
      andThen(RequestModel.create),
    );
}
