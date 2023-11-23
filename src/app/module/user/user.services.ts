import { TUser } from './user.interface';
import { userModel } from './user.model';

const createUserIntoDb = async (user: TUser) => {
  if (await userModel.getUser(user.userId)) {
    throw new Error('User already exists in the database!!!');
  }
  const result = await userModel.create(user);
  return result;
};

const getUsersFromDb = async () => {
  const users = await userModel.find();
  return users;
};

const getSingleUserFromDb = async (userId: number) => {
  const user = await userModel.getUser(userId);
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};

const updateUserInDb = async (userId: number, newDoc: TUser) => {
  const filter = { userId };
  const updatedDoc = {
    $set: newDoc,
  };

  const user = await userModel.getUser(userId);
  if (!user) {
    throw new Error('User not found');
  }

  const result = await userModel.findOneAndUpdate(filter, updatedDoc, {
    new: true,
  });
  return result;
};

const deleteUserFromDb = async (userId: number) => {
  if (!(await userModel.getUser(userId))) {
    throw new Error('User not found');
  }
  const result = await userModel.deleteOne(
    { userId },
    { new: true, runValidators: true },
  );
  if (result.deletedCount > 0) {
    return null;
  }
};

export const userServices = {
  createUserIntoDb,
  getUsersFromDb,
  getSingleUserFromDb,
  updateUserInDb,
  deleteUserFromDb,
};
