import {Order} from "../../models/index.js";
import {ORDER_STATUS} from "../../constants/order.js";

const placeOrder = async ({
  user,
  products,
  total
}) => {
  return await Order.create({
    user,
    products,
    total
  });
}

const getOrders = async ({
  page,
  limit,
  sortBy,
  order,
  user
}) => {
  const options = {};
  if (page) {
    options.page = parseInt(page);
  }
  if (limit) {
    options.limit = parseInt(limit);
  }
  if (sortBy && order) {
    options.sort = {[sortBy]: order};
  }

  const query = {
    user
  };

  return await Order.paginate(query, options);
}

const cancelOrder = async ({
  id,
  user
}) => {
  return Order.findOneAndUpdate({
    _id: id,
    user
  }, {
    status: ORDER_STATUS.CANCELLED
  }, {
    new: true
  });
}

const getOrderById = async ({
  id,
  user
}) => {
  return Order.findOne({
    _id: id,
    user
  });
}

export default {
  placeOrder,
  getOrders,
  cancelOrder,
  getOrderById
}