import express from "express";
import ProductController from "./product.controller.js";

const router = express.Router();

router.post('/', ProductController.createProduct);

router.get('/', ProductController.getProducts);

router.put('/:id', ProductController.updateProduct);

router.delete('/:id', ProductController.deleteProduct);

router.get('/:identifier', ProductController.getProduct);

router.get('/category/:categorySlug', ProductController.getProductByCategory);

export default router;