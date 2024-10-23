import mongoose, {Schema} from 'mongoose';
import slugifyPlugin from "./plugins/slugifyPlugin.js";
import paginate from "mongoose-paginate-v2";

const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  count: {
    type: Number,
    required: true
  },
  images: {
    type: [String],
    required: true
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  slug: {
    type: String
  }
}, {
  timestamps: true,
});

ProductSchema.plugin(slugifyPlugin, {
  sourceField: 'title',
  slugField: 'slug',
  maxTries: 100,
})

ProductSchema.plugin(paginate);

export default mongoose.model('Product', ProductSchema, 'products');