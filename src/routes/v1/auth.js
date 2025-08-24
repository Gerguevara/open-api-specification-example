const express = require('express');
const router = express.Router();

// Dummy user data for authentication
const dummyUsers = [
  {
    id: 1,
    name: 'John Doe',
    email: 'demo@gmail.com',
    age: 30,
    password: 'password123'
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    age: 25,
    password: 'secret456'
  }
];

// Simple JWT token generation (dummy implementation)
function generateDummyToken(user) {
  // In a real application, you would use a proper JWT library like 'jsonwebtoken'
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64');
  const payload = Buffer.from(JSON.stringify({ 
    userId: user.id, 
    email: user.email,
    exp: Math.floor(Date.now() / 1000) + (60 * 60) // 1 hour expiration
  })).toString('base64');
  const signature = Buffer.from('dummy_signature').toString('base64');
  
  return `${header}.${payload}.${signature}`;
}

// POST /auth/login
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({
      message: 'Email and password are required'
    });
  }

  // Find user by email and password
  const user = dummyUsers.find(u => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({
      message: 'Invalid email or password'
    });
  }

  // Generate token
  const token = generateDummyToken(user);

  // Return user data without password
  const { password: _, ...userWithoutPassword } = user;

  res.status(200).json({
    token,
    user: userWithoutPassword
  });
});

module.exports = router;
