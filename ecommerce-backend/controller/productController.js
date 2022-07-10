import { Product } from "../models/productModel";

const productController = {
  // Create Product
  async createProduct(req, res, next) {
    const product = await Product.create(req.body);

    res.status(200).json({
      success: true,
      product,
      message: "Product Created Sucessfully"
    });
  },

  // Fetch Product
  async getAllProducts(req, res, next) {
    const products = await Product.find();
    res.status(200).json({
      success: true,
      products,
      message: "Product Fetched Sucessfully"
    });
  },

  // Update Product
  async updateProduct(req, res, next) {
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
  },

  //   Delete Product
  async deleteProduct(req, res, next) {
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
  },

  // Get Product Details
  async getProductDetails(req, res) {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(400).json({
        success:false,
        message:"Product Cannot Found"
      });
    }
    else{
        res.status(200).json({
            success:true,
            product,
            message:"Product Show Sucessfully"
        })
    }
  }
};
export default productController;
