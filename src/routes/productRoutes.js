const express = require('express');
const router = express.Router();
const { verifyToken } = require('../utils/auth');
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
} = require('../controllers/productController');

// Route: POST /products (Create a new product)
router.post('/', verifyToken, createProduct);

// Route: GET /products (Get all products)
router.get('/', getAllProducts);

// Route: GET /products/:id (Get a single product by ID)
router.get('/:id', getProductById);

// Route: PUT /products/:id (Update a product by ID)
router.put('/:id', verifyToken, updateProductById);

// Route: DELETE /products/:id (Delete a product by ID)
router.delete('/:id', verifyToken, deleteProductById);

module.exports = router;