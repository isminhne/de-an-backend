import {Category} from "../../models/index.js";
import {BadRequestError} from "../../exception/errorResponse.js";
import {Types} from "mongoose";

const createCategory = async ({
  title,
  description,
  parent,
  thumbnail,
}) => {
  if (parent) {
    const parentCategory = await Category.findById(parent);
    if (!parentCategory) {
      throw new BadRequestError('Parent category not found');
    }
  }

  return await Category.create({
    title,
    description,
    parent,
    thumbnail
  });
}

const getCategories = async ({
  page,
  limit,
  sortBy,
  order,
  search
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

  const queries = {};
  if (search) {
    queries.title = {$regex: search, $options: 'i'};
  }

  return await Category.paginate(queries, options);
}

const updateCategory = async ({
  id,
  title,
  description,
  parent,
  thumbnail
}) => {
  const category = await Category.findById(id);
  if (!category) {
    throw new BadRequestError('Category not found');
  }

  if (parent) {
    const parentCategory = await Category.findById(parent);
    if (!parentCategory) {
      throw new BadRequestError('Parent category not found');
    }
  }

  category.title = title;
  category.description = description;
  category.parent = parent;
  category.thumbnail = thumbnail;

  return await category.save();
}

const deleteCategory = async ({id}) => {
  const category = await Category.findOneAndDelete({_id: id});
  if (!category) {
    throw new BadRequestError('Category not found');
  }
  return category;
}

const getCategory = async ({identifier}) => {
  const query = {
    $or: [
      {slug: identifier}
    ]
  };
  if (Types.ObjectId.isValid(identifier)) {
    query.$or.push({_id: new Types.ObjectId(identifier)});
  }
  //get by slug or id
  const category = await Category.findOne(query);
  if (!category) {
    throw new BadRequestError('Category not found');
  }
  return category;
}

export default {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
  getCategory
}