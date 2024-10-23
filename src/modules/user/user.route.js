import express from "express";
import UserController from "./user.controller.js";
import {userMiddleware} from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.use(userMiddleware);

router.post('/orders', UserController.placeOrder);

router.get('/orders', UserController.getOrders);

router.get('/orders/:id', UserController.getOrderById);

router.delete('/orders/:id', UserController.cancelOrder);

export default router;