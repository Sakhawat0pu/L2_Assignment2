import { Request, Response } from 'express';
import { userServices } from './user.services';
import userValidationSchema from './user.validatation';

const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    const validatedUser = userValidationSchema.parse(user);
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

export const userController = {
  createUser,
};
