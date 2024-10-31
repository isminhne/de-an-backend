import {Order} from "../../models/index.js";

const getOrders = async ({
  page,
  limit,
  sortBy,
  order
}) => {
  const options = {
    populate: ["products.product", "user"]
  };
  if (page) {
    options.page = parseInt(page);
  }
  if (limit) {
    options.limit = parseInt(limit);
  }
  if (sortBy && order) {
    options.sort = {[sortBy]: order};
  }

  return await Order.paginate({}, options);
}

const updateOrder = async ({
  id,
  status
}) => {
  return Order.findByIdAndUpdate(id, {status}, {new: true});
}

const deleteOrder = async ({
  id
}) => {
  return Order.findByIdAndDelete(id);
}

const getOrderById = async ({
  id
}) => {
  return Order.findById(id);
}

export default {
  getOrders,
  updateOrder,
  deleteOrder,
  getOrderById
}