import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RequestRepositoryInterface } from '../domain/interface/request.repository.interface';
import { RequestModel } from '../domain/model/request.model';
import {
  RequestTypeId,
  RequestTypes,
} from '../domain/model/valueObject/requestTypeId.value';

@Injectable()
export class RequestRepository implements RequestRepositoryInterface {
  constructor(private readonly prisma: PrismaService) {}

  async create(fromUserId: string, toUserId: string): Promise<RequestModel> {
    const request = await this.prisma.request.create({
      data: { fromUserId, toUserId, typeId: RequestTypes.SENT },
    });

    return RequestModel.create({
      ...request,
      typeId: RequestTypeId.create(request.typeId).value,
    });
  }

  async update(toUserId: string, typeId: RequestTypes): Promise<RequestModel> {
    const request = await this.prisma.request.update({
      where: {
        toUserId,
      },
      data: {
        typeId,
        updatedAt: new Date(),
        deletedAt: new Date(),
      },
    });

    return RequestModel.create({
      ...request,
      typeId: RequestTypeId.create(request.typeId).value,
    });
  }
}
