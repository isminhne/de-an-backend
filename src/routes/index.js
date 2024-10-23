import express from "express";
import HelloWorldRoute from "../modules/helloWorld/helloWorld.route.js";
import CategoryRoute from "../modules/category/category.route.js";
import ProductRoute from "../modules/product/product.route.js";
import AuthRoute from "../modules/auth/auth.route.js";
import OrderRoute from "../modules/order/order.route.js";
import UserRoute from "../modules/user/user.route.js";

const router = express.Router();

router.use('/hello-world', HelloWorldRoute);

router.use('/categories', CategoryRoute);

router.use('/products', ProductRoute);

router.use('/auth', AuthRoute);

router.use('/orders', OrderRoute);

router.use('/user', UserRoute);

export default router;