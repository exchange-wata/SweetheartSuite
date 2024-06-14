import { pipe } from 'effect';
import { andThen, tryPromise } from 'effect/Effect';
import { PrismaService } from '../../../prisma/prisma.service';
import { ListRepositoryInterface } from '../domain/interface/list.repository.interface';
import { ListModel } from '../model/list.model';

export class ListRepository implements ListRepositoryInterface {
  constructor(private readonly prisma: PrismaService) {}

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
        catch: (error) => {
          console.error('Error creating list:', error);
          return { _tag: 'cannot create list' } as const;
        },
        // catch: (error) => ({ _tag: error }) as const,
      }),
      andThen(ListModel.create),
    );
}
