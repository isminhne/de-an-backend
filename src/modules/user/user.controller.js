import catchAsync from "../../utils/catchAsync.js";
import UserService from "./user.service.js";

const getOrders = catchAsync(async (req, res, next) => {
  const data = await UserService.getOrders({
    page: req.query.page,
    limit: req.query.limit,
    sortBy: req.query.sortBy,
    order: req.query.order,
    user: req.user._id
  });
  res.json(data);
});

const placeOrder = catchAsync(async (req, res, next) => {
  const data = await UserService.placeOrder({
    user: req.user._id,
    products: req.body.products,
    total: req.body.total,
    deliveryInfo: req.body.deliveryInfo
  });
  res.json(data);
});

const cancelOrder = catchAsync(async (req, res, next) => {
  const data = await UserService.cancelOrder({
    id: req.params.id,
    user: req.user._id
  });
  res.json(data);
});

const getOrderById = catchAsync(async (req, res, next) => {
  const data = await UserService.getOrderById({
    id: req.params.id,
    user: req.user._id
  });
  res.json(data);
});

export default {
  getOrders,
  placeOrder,
  cancelOrder,
  getOrderById
}