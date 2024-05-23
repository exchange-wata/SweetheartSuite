import { Injectable } from '@nestjs/common';
import { RequestRepositoryInterface } from '../domain/interface/request.repository.interface';
import { RequestModel } from '../domain/model/request.model';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  RequestTypeId,
  RequestTypes,
} from '../domain/model/valueObject/requestTypeId.value';

@Injectable()
export class RequestRepository implements RequestRepositoryInterface {
  constructor(private readonly prisma: PrismaService) {}

  async create(from: string, to: string): Promise<RequestModel> {
    const request = await this.prisma.request.create({
      data: { from, to, typeId: RequestTypes.SENT },
    });

    return RequestModel.create({
      ...request,
      typeId: RequestTypeId.create(request.typeId).value,
    });
  }
}
