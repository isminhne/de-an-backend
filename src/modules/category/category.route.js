import express from "express";
import CategoryController from "./category.controller.js";
import {adminMiddleware, userMiddleware} from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.post('/', userMiddleware, adminMiddleware, CategoryController.createCategory);

router.get('/', CategoryController.getCategories);

router.put('/:id', userMiddleware, adminMiddleware, CategoryController.updateCategory);

router.delete('/:id', userMiddleware, adminMiddleware, CategoryController.deleteCategory);

router.get('/:identifier', CategoryController.getCategory);

export default router;