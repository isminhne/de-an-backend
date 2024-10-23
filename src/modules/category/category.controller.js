import catchAsync from "../../utils/catchAsync.js";
import CategoryService from "./category.service.js";

const createCategory = catchAsync(async (req, res, next) => {
  const data = await CategoryService.createCategory({
    title: req.body.title,
    description: req.body.description,
    parent: req.body.parent,
    thumbnail: req.body.thumbnail
  });
  res.json(data);
});

const getCategories = catchAsync(async (req, res, next) => {
  const data = await CategoryService.getCategories({
    page: req.query.page,
    limit: req.query.limit,
    sortBy: req.query.sortBy,
    order: req.query.order,
    search: req.query.search
  });
  res.json(data);
});

const updateCategory = catchAsync(async (req, res, next) => {
  const data = await CategoryService.updateCategory({
    id: req.params.id,
    title: req.body.title,
    description: req.body.description,
    parent: req.body.parent,
    thumbnail: req.body.thumbnail
  });
  res.json(data);
});

const deleteCategory = catchAsync(async (req, res, next) => {
  const data = await CategoryService.deleteCategory({
    id: req.params.id
  });
  res.json(data);
});

const getCategory = catchAsync(async (req, res, next) => {
  const data = await CategoryService.getCategory({
    identifier: req.params.identifier
  });
  res.json(data);
});

export default {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
  getCategory
}