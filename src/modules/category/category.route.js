import express from "express";
import CategoryController from "./category.controller.js";

const router = express.Router();

router.post('/', CategoryController.createCategory);

router.get('/', CategoryController.getCategories);

router.put('/:id', CategoryController.updateCategory);

router.delete('/:id', CategoryController.deleteCategory);

router.get('/:identifier', CategoryController.getCategory);

export default router;