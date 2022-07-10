import express from "express";
import {
  createProduct,
  updateProduct,
  getAllProducts,
  getProductDetails,
  deleteProduct
} from "../controller/productController";
const productRoute = express.Router();

//Route Imports

productRoute.get("/products", getAllProducts);
productRoute.post("/product/new", createProduct);
productRoute
  .route("/product/:id")
  .put(updateProduct)
  .delete(deleteProduct)
  .get(getProductDetails);

export default productRoute;
