import express from 'express';
import { userController } from './user.controller';

const router = express.Router();

router.post('/', userController.createUser);

router.get('/', userController.getUsers);

router.get('/:userId', userController.getSingleUser);

router.get('/:userId/orders', userController.getUserOrders);

router.get('/:userId/orders/total-price', userController.getOrderTotalForAUser);

router.put('/:userId', userController.updateUser);

router.put('/:userId/orders', userController.updateUserOrder);

router.delete('/:userId', userController.deleteUser);

export const usersRouter = router;
