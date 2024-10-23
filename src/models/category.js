import mongoose from 'mongoose';
import slugifyPlugin from "./plugins/slugifyPlugin.js";
import paginate from 'mongoose-paginate-v2';

const CategorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    default: null
  },
  thumbnail: {
    type: String,
    required: true
  },
  slug: {
    type: String,
  },
}, {
  timestamps: true,
});

CategorySchema.plugin(slugifyPlugin, {
  sourceField: 'title',
  slugField: 'slug',
  maxTries: 100,
})

CategorySchema.plugin(paginate);

export default mongoose.model('Category', CategorySchema, 'categories');