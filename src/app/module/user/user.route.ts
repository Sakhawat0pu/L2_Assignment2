import express from 'express';
import { userController } from './user.controller';

// Create an Express router
const router = express.Router();

// Route: Create a new user
router.post('/', userController.createUser);

// Route: Get all users
router.get('/', userController.getUsers);

// Route: Get a single user by userId
router.get('/:userId', userController.getSingleUser);

// Route: Get orders for a specific user
router.get('/:userId/orders', userController.getUserOrders);

// Route: Get the total price of orders for a specific user
router.get('/:userId/orders/total-price', userController.getOrderTotalForAUser);

// Route: Update a user by userId
router.put('/:userId', userController.updateUser);

// Route: Update orders for a specific user
router.put('/:userId/orders', userController.updateUserOrder);

// Route: Delete a user by userId
router.delete('/:userId', userController.deleteUser);

// Export the router
export const usersRouter = router;
