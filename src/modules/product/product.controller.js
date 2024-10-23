import catchAsync from "../../utils/catchAsync.js";
import ProductService from "./product.service.js";

const createProduct = catchAsync(async (req, res, next) => {
  const data = await ProductService.createProduct({
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    images: req.body.images,
    count: req.body.count
  });
  res.json(data);
});

const getProducts = catchAsync(async (req, res, next) => {
  const data = await ProductService.getProducts({
    page: req.query.page,
    limit: req.query.limit,
    sortBy: req.query.sortBy,
    order: req.query.order,
    search: req.query.search
  });
  res.json(data);
});

const updateProduct = catchAsync(async (req, res, next) => {
  const data = await ProductService.updateProduct({
    id: req.params.id,
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    images: req.body.images,
    count: req.body.count
  });
  res.json(data);
});

const deleteProduct = catchAsync(async (req, res, next) => {
  const data = await ProductService.deleteProduct({
    id: req.params.id
  });
  res.json(data);
});

const getProduct = catchAsync(async (req, res, next) => {
  const data = await ProductService.getProduct({
    identifier: req.params.identifier
  });
  res.json(data);
});

const getProductByCategory = catchAsync(async (req, res, next) => {
  const data = await ProductService.getProductByCategory({
    categorySlug: req.params.categorySlug,
    page: req.query.page,
    limit: req.query.limit,
    sortBy: req.query.sortBy,
    order: req.query.order
  });
  res.json(data);
});

export default {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  getProduct,
  getProductByCategory
}