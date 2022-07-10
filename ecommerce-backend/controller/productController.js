import { Product } from "../models/productModel";
import ErrorHandler from "../utils/errorHandler";
import asyncErrorHandler from "../middleware/catchAsyncErrors";
import AppFeatures from "../utils/appFeatures";

// Create Product
const createProduct = asyncErrorHandler(async (req, res, next) => {
  const product = await Product.create(req.body);

  res.status(200).json({
    success: true,
    product,
    message: "Product Created Sucessfully"
  });
});

// Fetch Product
const getAllProducts = asyncErrorHandler(async (req, res, next) => {
  const resultPerPage = 2;
  const productCount = await Product.countDocuments();

  const AppFeature = new AppFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
  const products = await AppFeature.query;
  res.status(200).json({
    success: true,
    products,
    productCount,
    message: "Product Fetched Sucessfully"
  });
});

// Update Product
const updateProduct = asyncErrorHandler(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(400).json({
      success: false,
      message: "Product Not Found"
    });
  } else {
    product = await Product.findByIdAndUpdate(req.params.id, req.body).then(
      () => {
        res.status(200).json({
          success: true,
          message: "Product Updated Sucessfully"
        });
      }
    );
  }
});

//   Delete Product
const deleteProduct = asyncErrorHandler(async (req, res, next) => {
  const product = Product.findById(req.params.id);
  if (!product) {
    res.status(400).json({
      success: false,
      message: "Product Cannot Found"
    });
  } else {
    await product.remove();
    res.status(200).json({
      success: true,
      message: "Product Delete Sucessfully"
    });
  }
});

// Get Product Details
const getProductDetails = asyncErrorHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product Not Found", 404));
  } else {
    res.status(200).json({
      success: true,
      product,
      message: "Product Show Sucessfully"
    });
  }
});

export {
  createProduct,
  getAllProducts,
  getProductDetails,
  deleteProduct,
  updateProduct
};
