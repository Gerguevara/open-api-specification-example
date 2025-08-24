// JWT Authentication Middleware
// This is a dummy implementation for demonstration purposes

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({
      message: 'Access token is required'
    });
  }

  try {
    // In a real application, you would verify the JWT token properly
    // using a library like 'jsonwebtoken' and a secret key
    
    // Dummy validation - just check if token has the expected format
    const parts = token.split('.');
    if (parts.length !== 3) {
      throw new Error('Invalid token format');
    }

    // Decode payload (in real app, you'd verify signature first)
    const payload = JSON.parse(Buffer.from(parts[1], 'base64').toString());
    
    // Check if token is expired
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
      return res.status(401).json({
        message: 'Token has expired'
      });
    }

    // Add user info to request object
    req.user = {
      userId: payload.userId,
      email: payload.email
    };

    next();
  } catch (error) {
    return res.status(403).json({
      message: 'Invalid or malformed token'
    });
  }
}

module.exports = { authenticateToken };
