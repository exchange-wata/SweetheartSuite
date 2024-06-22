import { Injectable } from '@nestjs/common';
import { pipe } from 'effect';
import { andThen, tryPromise } from 'effect/Effect';
import { PrismaService } from '../../../prisma/prisma.service';
import { ListRepositoryInterface } from '../domain/interface/list.repository.interface';
import { ListModel } from '../model/list.model';

@Injectable()
export class ListRepository implements ListRepositoryInterface {
  constructor(private readonly prisma: PrismaService) {}

  findByListId = (listId: string) =>
    pipe(
      tryPromise({
        try: () =>
          this.prisma.list.findUniqueOrThrow({ where: { id: listId } }),
        catch: () => ({ _tag: 'can not find list' }) as const,
      }),
      andThen(ListModel.create),
    );

  create = (listModel: ListModel) =>
    pipe(
      tryPromise({
        try: () =>
          this.prisma.list.create({
            data: {
              id: listModel.id,
              name: listModel.name,
              coupleId: listModel.coupleId,
            },
          }),
        catch: () => ({ _tag: 'can not create list' }) as const,
      }),
      andThen(ListModel.create),
    );

  update = (listModel: ListModel) =>
    pipe(
      tryPromise({
        try: () =>
          this.prisma.list.update({
            where: {
              id: listModel.id,
              coupleId: listModel.coupleId,
            },
            data: {
              name: listModel.name,
            },
          }),
        catch: () => ({ _tag: 'can not update list' }) as const,
      }),
      andThen(ListModel.create),
    );
}
