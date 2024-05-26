import { CoupleModel } from '../model/couple.model';

export interface CoupleRepositoryInterface {
  findByUserId(userId: string): Promise<CoupleModel[]>;
  create(userId1: string, userId2: string): Promise<CoupleModel>;
}
