const express = require('express');
const router = express.Router();

// GET /v1/products
router.get('/', (req, res) => {
  // Dummy data
  const products = [
    { 
      id: 1, 
      name: 'Product 1', 
      price: 19.99, 
      category: 'Electronics',
      tags: ['tag1', 'tag2'],
      inStock: true,
      specifications: { color: 'red', size: 'M' },
      ratings: [5, 4, 3]
    },
    { 
      id: 2, 
      name: 'Product 2', 
      price: 29.99, 
      category: 'Clothing',
      tags: ['tag3', 'tag4'],
      inStock: false,
      specifications: { color: 'blue', size: 'L' },
      ratings: [4, 4, 5]
    }
  ];
  
  res.json(products);
});

// POST /v1/products
router.post('/', (req, res) => {
  const { name, price, category, tags, inStock, specifications, ratings } = req.body;
  const newProduct = { 
    id: Date.now(), // Simple ID generation
    name, 
    price, 
    category, 
    tags, 
    inStock, 
    specifications, 
    ratings 
  };
  res.status(201).json(newProduct);
});

// GET /v1/products/:id
router.get('/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  
  // Dummy data
  const products = [
    { 
      id: 1, 
      name: 'Product 1', 
      price: 19.99, 
      category: 'Electronics',
      tags: ['tag1', 'tag2'],
      inStock: true,
      specifications: { color: 'red', size: 'M' },
      ratings: [5, 4, 3]
    },
    { 
      id: 2, 
      name: 'Product 2', 
      price: 29.99, 
      category: 'Clothing',
      tags: ['tag3', 'tag4'],
      inStock: false,
      specifications: { color: 'blue', size: 'L' },
      ratings: [4, 4, 5]
    }
  ];
  
  const product = products.find(p => p.id === productId);
  
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  
  res.json(product);
});

// PUT /v1/products/:id
router.put('/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const { name, price, category, tags, inStock, specifications, ratings } = req.body;
  
  // Simulate updating product
  const updatedProduct = { 
    id: productId, 
    name, 
    price, 
    category, 
    tags, 
    inStock, 
    specifications, 
    ratings 
  };
  res.json(updatedProduct);
});

// DELETE /v1/products/:id
router.delete('/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  res.status(204).send();
});

module.exports = router;
