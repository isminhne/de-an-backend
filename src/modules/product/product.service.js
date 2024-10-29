import {Category, Product} from "../../models/index.js";
import {BadRequestError} from "../../exception/errorResponse.js";
import {Types} from "mongoose";

const createProduct = async ({
  title,
  description,
  price,
  count,
  images,
  category
}) => {
  const categoryExists = await Category.findById(category);
  if (categoryExists) {
    if (!categoryExists) {
      throw new BadRequestError('Category not found');
    }
  }

  return await Product.create({
    title,
    description,
    price,
    count,
    images,
    category
  });
}

const getProducts = async ({
  page,
  limit,
  sortBy,
  order,
  search
}) => {
  const options = {
    populate: 'category'
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

  const queries = {};
  if (search) {
    queries.title = {$regex: search, $options: 'i'};
  }

  return await Product.paginate(queries, options);
}

const updateProduct = async ({
  id,
  title,
  description,
  price,
  count,
  images,
  category
}) => {
  const product = await Product.findById(id);
  if (!product) {
    throw new BadRequestError('Product not found');
  }

  if (category) {
    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      throw new BadRequestError('Category not found');
    }
  }

  return Product.findByIdAndUpdate(id, {
    title,
    description,
    price,
    count,
    images,
    category
  }, {new: true});
}

const deleteProduct = async ({
  id
}) => {
  const product = await Product.findOneAndDelete({_id: id});
  if (!product) {
    throw new BadRequestError('Product not found');
  }
  return product;
}

const getProduct = async ({
  identifier
}) => {
  const query = {
    $or: [
      {
        slug: identifier
      }
    ]
  }
  if (Types.ObjectId.isValid(identifier)) {
    query.$or.push({
      _id: identifier
    });
  }
  const product = await Product.findOne(query).populate('category');
  if (!product) {
    throw new BadRequestError('Product not found');
  }
  return product;
}

const getProductByCategory = async ({
  categorySlug,
  page,
  limit,
  sortBy,
  order
}) => {
  const category = await Category.findOne({
    slug: categorySlug
  });
  if (!category) {
    throw new BadRequestError('Category not found');
  }

  const options = {
    populate: 'category'
  };
  if (page) {
    options.page = parseInt(page);
  }
  if (limit) {
    options.limit = parseInt(limit);
  }
  if (sortBy && order) {
    options.sort = {
      [sortBy]: order
    };
  }

  const queries = {
    category: category._id
  };

  return await Product.paginate(queries, options);
}

export default {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  getProduct,
  getProductByCategory
}