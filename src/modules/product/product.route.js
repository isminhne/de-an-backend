import express from "express";
import ProductController from "./product.controller.js";
import {adminMiddleware, userMiddleware} from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.post('/', userMiddleware, adminMiddleware, ProductController.createProduct);

router.get('/', ProductController.getProducts);

router.put('/:id', userMiddleware, adminMiddleware, ProductController.updateProduct);

router.delete('/:id', userMiddleware, adminMiddleware, ProductController.deleteProduct);

router.get('/:identifier', ProductController.getProduct);

router.get('/category/:categorySlug', ProductController.getProductByCategory);

export default router;