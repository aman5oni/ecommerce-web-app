import { Product } from "../models/productModel";
import ErrorHandler from "../utils/errorHandler";
import asyncErrorHandler from "../middleware/catchAsyncErrors";
import AppFeatures from "../utils/appFeatures";

// Create Product
const createProduct = asyncErrorHandler(async (req, res, next) => {
  req.body.user = req.user.id;

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

// Create Or Update Product Review
const createProductReview = asyncErrorHandler(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment
  };
  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find((rev) => {
    rev.user === req.user._id.toString();
  });

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id) {
        rev.rating = rating;
        rev.comment = comment;
      }
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;

    let average = 0;

    product.reviews.forEach((rev) => {
      average += rev.rating;
    });

    product.rating = average / product.reviews.length;

    await product.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Product Reviwed SucessFully"
    });
  }
});

export {
  createProduct,
  getAllProducts,
  getProductDetails,
  deleteProduct,
  updateProduct,
  createProductReview
};
