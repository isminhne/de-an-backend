import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2";
import {ORDER_STATUS} from "../constants/order.js";
import mongooseAutoPopulate from "mongoose-autopopulate";

const OrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  deliveryInfo: {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
    },
    street: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    zipCode: {
      type: String,
    },
    country: {
      type: String,
    },
    phone: {
      type: String
    }
  },
  products: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
      autopopulate: true
    },
    quantity: {
      type: Number,
      required: true
    }
  }],
  status: {
    type: String,
    enum: Object.values(ORDER_STATUS),
    default: ORDER_STATUS.PENDING
  },
  total: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});

OrderSchema.plugin(paginate);

OrderSchema.plugin(mongooseAutoPopulate);

export default mongoose.model('Order', OrderSchema, 'orders');