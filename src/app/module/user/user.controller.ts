import { Request, Response } from 'express';
import { userServices } from './user.services';
import userValidationSchema from './user.validation';

// Controller function: Create a new user
const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    const validatedUser = userValidationSchema.parse(user); // User data validation
    const result = await userServices.createUserIntoDb(validatedUser);
    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong!',
      error: err,
    });
  }
};

// Controller function: Get all users
const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await userServices.getUsersFromDb();
    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: users,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong!',
      error: err,
    });
  }
};

// Controller function: Get a single user by userId
const getSingleUser = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);
    const user = await userServices.getSingleUserFromDb(userId);
    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: user,
    });
  } catch (err: any) {
    if (err.message === 'User not found') {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    } else {
      res.status(500).json({
        success: false,
        message: err.message || 'Something went wrong!',
        error: err,
      });
    }
  }
};

// Controller function: Update a user by userId
const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);
    const doc = req.body;

    const result = await userServices.updateUserInDb(userId, doc);

    res.status(200).json({
      success: true,
      message: 'User updated successfully!',
      data: result,
    });
  } catch (err: any) {
    if (err.message === 'User not found') {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    } else {
      res.status(500).json({
        success: false,
        message: err.message || 'Something went wrong!',
        error: err,
      });
    }
  }
};

// Controller function: Delete a user by userId
const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);
    const result = await userServices.deleteUserFromDb(userId);
    res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
      data: result,
    });
  } catch (err: any) {
    if (err.message === 'User not found') {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    } else {
      res.status(500).json({
        success: false,
        message: err.message || 'Something went wrong!',
        error: err,
      });
    }
  }
};

// Controller function: Update orders for a specific user
const updateUserOrder = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);
    const doc = req.body;

    const result = await userServices.updateUserOrderInDb(userId, doc);

    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: result,
    });
  } catch (err: any) {
    if (err.message === 'User not found') {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    } else {
      res.status(500).json({
        success: false,
        message: err.message || 'Something went wrong!',
        error: err,
      });
    }
  }
};

// Controller function: Get orders for a specific user
const getUserOrders = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);
    const orders = await userServices.getUserOrdersFromDb(userId);
    res.status(200).json({
      success: true,
      message: 'Order fetched successfully!',
      data: orders,
    });
  } catch (err: any) {
    if (err.message === 'User not found') {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    } else {
      res.status(500).json({
        success: false,
        message: err.message || 'Something went wrong!',
        error: err,
      });
    }
  }
};

// Controller function: Get the total price of orders for a specific user
const getOrderTotalForAUser = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);
    const total = await userServices.getOrderTotalForAUserFromDb(userId);
    res.status(200).json({
      success: true,
      message: 'Total price calculated successfully!',
      data: total,
    });
  } catch (err: any) {
    if (err.message === 'User not found') {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    } else {
      res.status(500).json({
        success: false,
        message: err.message || 'Something went wrong!',
        error: err,
      });
    }
  }
};
export const userController = {
  createUser,
  getUsers,
  getSingleUser,
  updateUser,
  updateUserOrder,
  deleteUser,
  getUserOrders,
  getOrderTotalForAUser,
};
