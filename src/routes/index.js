import express from "express";
import HelloWorldRoute from "../modules/helloWorld/helloWorld.route.js";
import CategoryRoute from "../modules/category/category.route.js";
import ProductRoute from "../modules/product/product.route.js";

const router = express.Router();

router.use('/hello-world', HelloWorldRoute);

router.use('/categories', CategoryRoute);

router.use('/products', ProductRoute);

export default router;