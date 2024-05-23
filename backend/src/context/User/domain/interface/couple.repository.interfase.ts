import { CoupleModel } from '../model/couple.model';

export interface CoupleRepositoryInterface {
  findByUserId(token: string): Promise<CoupleModel>;
}
