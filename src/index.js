const express = require('express');
// documentation
const swaggerUi = require('swagger-ui-express');
const OpenApiValidator = require('express-openapi-validator');
const yml = require('yamljs');
const path = require('path');

// implementation
const app = express();
const port = 3000;

//configs
app.use(express.json()); // for parsing  application/json
const swaggerDocument = yml.load(path.join(__dirname, '../openapi.yaml'));


// documentation
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(
  OpenApiValidator.middleware({
    apiSpec: swaggerDocument,
    validateRequests: true, // (default)
    validateResponses: true, // false by default
    ignorePaths: /\/docs(\/.*)?/  // Exclude docs from validation
  })
)
// SWagger error handler (shows a JSON response with the error details)
// for  every validation error
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    errors: err.errors, 
  })
});


//routes
app.get('/v1/hello', (req, res) => {
  res.send('Hello from the hello route!');
});
app.get('/v2/hello', (req, res) => {
  res.send('Hello from  v2' + new Date().toISOString());
});


app.post('/v1/users', (req, res) => {
  const { name, email, age } = req.body;
  const newUser = { name, email, age, id: 1};
  res.status(201).json(newUser);
});

app.get('/v1/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  
  // Dummy data
  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', age: 30 },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', age: 25 },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', age: 35 }
  ];
  
  const user = users.find(u => u.id === userId);
  
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  
  res.json(user);
});

app.put('/v1/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const { name, email, age = 18 } = req.body;
  
  // Simulate updating user
  const updatedUser = { id: userId, name, email, age };
  res.json(updatedUser);
});

app.delete('/v1/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  res.status(204).send();
});

// Products routes
app.get('/v1/products', (req, res) => {
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

app.post('/v1/products', (req, res) => {
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

app.get('/v1/products/:id', (req, res) => {
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

app.put('/v1/products/:id', (req, res) => {
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

app.delete('/v1/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  res.status(204).send();
});

// execute the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
  console.log(`API docs available at http://localhost:${port}/v1/docs`);
  console.log(`API docs available at http://localhost:${port}/v2/docs`);
});