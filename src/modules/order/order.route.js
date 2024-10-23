import express from "express";
import OrderController from "./order.controller.js";
import {adminMiddleware, userMiddleware} from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.use(userMiddleware, adminMiddleware);

router.get('/', OrderController.getOrders);

router.patch('/:id', OrderController.updateOrder);

router.delete('/:id', OrderController.deleteOrder);

router.get('/:id', OrderController.getOrderById);

export default router;