import { Injectable } from '@nestjs/common';
import { pipe } from 'effect';
import { andThen, tryPromise } from 'effect/Effect';
import { PrismaService } from 'src/prisma/prisma.service';
import { ContentsRepositoryInterface } from '../domain/interface/contents.repository.interface';
import { ContentsModel } from '../domain/model/contents.model';

@Injectable()
export class ContentsRepository implements ContentsRepositoryInterface {
  constructor(private readonly prisma: PrismaService) {}

  create = (contentsModel: ContentsModel) =>
    pipe(
      tryPromise({
        try: () =>
          this.prisma.contents.create({
            data: {
              id: contentsModel.id,
              listId: contentsModel.listId,
              content: contentsModel.content,
              isDone: contentsModel.isDone,
            },
          }),
        catch: () => ({ _tag: 'can not create contents' }) as const,
      }),
      andThen(ContentsModel.create),
    );

  findById = (id: string) =>
    pipe(
      tryPromise({
        try: () =>
          this.prisma.contents.findUniqueOrThrow({
            where: {
              id,
            },
          }),
        catch: () => ({ _tag: 'can not find contents' }) as const,
      }),
      andThen(ContentsModel.create),
    );

  findByListId = (listId: string) =>
    pipe(
      tryPromise({
        try: () =>
          this.prisma.contents.findMany({
            where: {
              listId,
            },
          }),
        catch: () => ({ _tag: 'can not find contents' }) as const,
      }),
      andThen((contents) => contents.map(ContentsModel.create)),
    );

  update = (contentsModel: ContentsModel) =>
    pipe(
      tryPromise({
        try: () =>
          this.prisma.contents.update({
            where: {
              id: contentsModel.id,
            },
            data: {
              content: contentsModel.content,
              isDone: contentsModel.isDone,
              updatedAt: new Date(),
            },
          }),
        catch: () => ({ _tag: 'can not update contents' }) as const,
      }),
      andThen(ContentsModel.create),
    );

  deleteMany = (ids: string[]) =>
    pipe(
      tryPromise({
        try: () =>
          this.prisma.contents.deleteMany({
            where: {
              id: { in: ids },
            },
          }),
        catch: () => ({ _tag: 'can not delete contents' }) as const,
      }),
    );
}
