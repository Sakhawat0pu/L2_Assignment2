import { TOrder, TUser } from './user.interface';
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
    runValidators: true,
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

const updateUserOrderInDb = async (userId: number, order: TOrder) => {
  const filter = { userId };
  const user = await userModel.getUser(userId);
  if (!user) {
    throw new Error('User not found');
  }
  if (user.orders) {
    const result = await userModel.updateOne(filter, {
      $push: { orders: order },
    });
    return result.modifiedCount > 0 ? null : result;
  }
  const result = await userModel.updateOne(filter, {
    $set: { orders: [order] },
  });
  return result.modifiedCount > 0 ? null : result;
};

const getUserOrdersFromDb = async (userId: number) => {
  const user = await userModel.getUser(userId);
  if (!user) {
    throw new Error('User not found');
  }
  const orders = await userModel.findOne({ userId });
  return orders;
};

const getOrderTotalForAUserFromDb = async (userId: number) => {
  const user = await userModel.getUser(userId);
  if (!user) {
    throw new Error('User not found');
  }
  if (!user.orders || user.orders.length === 0) {
    return { totalPrice: 0 };
  }
  const result = await userModel.aggregate([
    { $match: { userId } },
    {
      $project: {
        totalPrice: {
          $reduce: {
            input: '$orders',
            initialValue: 0,
            in: {
              $add: [
                '$$value',
                { $multiply: ['$$this.price', '$$this.quantity'] },
              ],
            },
          },
        },
      },
    },
    {
      $project: { _id: 0, totalPrice: 1 },
    },
  ]);

  return result[0];
};

export const userServices = {
  createUserIntoDb,
  getUsersFromDb,
  getSingleUserFromDb,
  updateUserInDb,
  updateUserOrderInDb,
  deleteUserFromDb,
  getUserOrdersFromDb,
  getOrderTotalForAUserFromDb,
};
