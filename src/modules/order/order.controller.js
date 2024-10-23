import catchAsync from "../../utils/catchAsync.js";
import OrderService from "./order.service.js";

const getOrders = catchAsync(async (req, res, next) => {
  const data = await OrderService.getOrders({
    page: req.query.page,
    limit: req.query.limit,
    sortBy: req.query.sortBy,
    order: req.query.order
  });
  res.json(data);
});

const updateOrder = catchAsync(async (req, res, next) => {
  const data = await OrderService.updateOrder({
    id: req.params.id,
    status: req.body.status
  });
  res.json(data);
});

const deleteOrder = catchAsync(async (req, res, next) => {
  const data = await OrderService.deleteOrder({
    id: req.params.id
  });
  res.json(data);
});

const getOrderById = catchAsync(async (req, res, next) => {
  const data = await OrderService.getOrderById({
    id: req.params.id
  });
  res.json(data);
});

export default {
  getOrders,
  updateOrder,
  deleteOrder,
  getOrderById
}