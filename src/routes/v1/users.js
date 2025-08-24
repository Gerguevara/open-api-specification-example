const express = require('express');
const { authenticateToken } = require('../../middleware/auth');
const router = express.Router();

// GET /v1/users/:id (Protected route - requires JWT)
router.get('/:id', authenticateToken, (req, res) => {
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

// POST /v1/users
router.post('/', (req, res) => {
  const { name, email, age } = req.body;
  const newUser = { name, email, age, id: 1};
  res.status(201).json(newUser);
});

// PUT /v1/users/:id
router.put('/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const { name, email, age = 18 } = req.body;
  
  // Simulate updating user
  const updatedUser = { id: userId, name, email, age };
  res.json(updatedUser);
});

// DELETE /v1/users/:id
router.delete('/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  res.status(204).send();
});

module.exports = router;
