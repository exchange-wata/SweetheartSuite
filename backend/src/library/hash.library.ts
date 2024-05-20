import * as bcrypt from 'bcrypt';

const saltOrRounds = 10;
export const createToken = async (mailaddress: string) =>
  await bcrypt.hash(mailaddress, saltOrRounds);
