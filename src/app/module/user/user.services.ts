import { TUser } from './user.interface';
import { userModel } from './user.model';

const createUserIntoDb = async (user: TUser) => {
  if (await userModel.getUser(user.userId)) {
    throw new Error('User already exists in the database!!!');
  }
  const result = await userModel.create(user);
  return result;
};

export const userServices = {
  createUserIntoDb,
};
