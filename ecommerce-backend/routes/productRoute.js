import express from "express"
import app from "../app"
import productController from "../controller/productController"
const productRoute = express.Router()

//Route Imports

productRoute.get("/products",productController.getAllProducts)
productRoute.post("/product/new",productController.createProduct)
productRoute.route("/product/:id")
.put(productController.updateProduct)
.delete(productController.deleteProduct)
.get(productController.getProductDetails)

// Middleware For Error


export default productRoute