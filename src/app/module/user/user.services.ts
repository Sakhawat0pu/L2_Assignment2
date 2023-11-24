import { TOrder, TUser } from './user.interface';
import { userModel } from './user.model';

// Service function: Create a new user in the database
const createUserIntoDb = async (user: TUser) => {
  // Check if a user with the same userId already exists
  if (await userModel.getUser(user.userId)) {
    throw new Error('User already exists in the database!!!');
  }
  const result = await userModel.create(user);
  return result;
};

// Service function: Get all users from the database
const getUsersFromDb = async () => {
  const users = await userModel.find();
  return users;
};

// Service function: Get a single user by userId from the database
const getSingleUserFromDb = async (userId: number) => {
  // Retrieve a user by userId from the database
  const user = await userModel.getUser(userId);
  // Check if a user with the provided userId exists in the database, throw an error otherwise
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};

// Service function: Update a user by userId in the database
const updateUserInDb = async (userId: number, newDoc: TUser) => {
  const filter = { userId };
  const updatedDoc = {
    $set: newDoc,
  };

  // Retrieve the user by userId from the database
  const user = await userModel.getUser(userId);
  // Check if a user with the provided userId exists in the database, throw an error otherwise
  if (!user) {
    throw new Error('User not found');
  }

  // Update the user in the database
  const result = await userModel.findOneAndUpdate(filter, updatedDoc, {
    new: true,
    runValidators: true,
  });
  return result;
};

// Service function: Delete a user by userId from the database
const deleteUserFromDb = async (userId: number) => {
  // Check if a user with the provided userId exists in the database, throw an error otherwise
  if (!(await userModel.getUser(userId))) {
    throw new Error('User not found');
  }

  // Delete the user from the database
  const result = await userModel.deleteOne({ userId });
  // If the user was deleted successfully, return nul, otherwise throw an error
  if (result.deletedCount > 0) {
    return null;
  } else {
    throw new Error('Something went wrong');
  }
};

// Service function: Update orders for a specific user in the database
const updateUserOrderInDb = async (userId: number, order: TOrder) => {
  const filter = { userId };
  // Retrieve the user by userId from the database
  const user = await userModel.getUser(userId);
  if (!user) {
    throw new Error('User not found');
  }
  // If the user already has orders field, push the new order into the array; otherwise, create a new array with the order
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

// Service function: Get orders for a specific user from the database
const getUserOrdersFromDb = async (userId: number) => {
  const user = await userModel.getUser(userId);
  if (!user) {
    throw new Error('User not found');
  }

  // find the user by userId and only return the orders field
  const orders = await userModel.findOne({ userId }, { orders: 1 });
  return orders;
};

// Service function: Get the total order price for a specific user from the database
const getOrderTotalForAUserFromDb = async (userId: number) => {
  const user = await userModel.getUser(userId);
  if (!user) {
    throw new Error('User not found');
  }
  // If the user has no orders, return { totalPrice: 0 }
  if (!user.orders || user.orders.length === 0) {
    return { totalPrice: 0 };
  }
  // Calculate the total price of all orders for the user using aggregation
  // $reduce returns an array with one object
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

  // return the object from the result array
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
