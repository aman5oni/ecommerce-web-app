import express from "express";
import {
  createProduct,
  updateProduct,
  getAllProducts,
  getProductDetails,
  deleteProduct,
  createProductReview
} from "../controller/productController";
import {
  authorizeRoles,
  isAuthenticatedUser
} from "../middleware/authentication";

const productRoute = express.Router();

//Route Imports

productRoute.route("/products").get(getAllProducts);

productRoute
  .route("/admin/product/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), createProduct);

productRoute
  .route("/admin/product/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);

productRoute.route("/product/:id").get(getProductDetails);

productRoute.route("/review").put(isAuthenticatedUser,createProductReview);

export default productRoute;
