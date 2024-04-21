const Product = require('../models/Product');

// Create a new product
const createProduct = async (req, res) => {
  const { name, description, careLevel, price, waterDuration, humidityLevel, sunLevel, size } = req.body;
  try {
    const product = await Product.create({
      name,
      description,
      careLevel,
      price,
      waterDuration,
      humidityLevel,
      sunLevel,
      size,
    });
    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create product', error: error.message });
  }
};

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch products', error: error.message });
  }
};

// Get a single product by ID
const getProductById = async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch product', error: error.message });
  }
};

// Update a product by ID
const updateProductById = async (req, res) => {
  const productId = req.params.id;
  const updates = req.body;
  try {
    const updatedProduct = await Product.findByIdAndUpdate(productId, updates, { new: true });
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update product', error: error.message });
  }
};

// Delete a product by ID
const deleteProductById = async (req, res) => {
  const productId = req.params.id;
  try {
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete product', error: error.message });
  }
};

module.exports = { createProduct, getAllProducts, getProductById, updateProductById, deleteProductById };