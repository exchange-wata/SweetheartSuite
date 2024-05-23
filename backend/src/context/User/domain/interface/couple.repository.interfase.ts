import { CoupleModel } from '../model/couple.model';

export interface CoupleRepositoryInterface {
  findByUserId(userId: string): Promise<CoupleModel[]>;
}
