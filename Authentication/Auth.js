import jwt from 'jsonwebtoken';

// Secret key should be the same as used in creating the token
const secretKey = 'sahil';

const verifyRole = (allowedRoles) => (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    console.log(decoded, "token decoded");

    // Check if the user's role is allowed
    if (!allowedRoles.includes(decoded.role)) {
      return res.status(403).json({ message: 'Forbidden: You do not have the required role' });
    }

    req.user = decoded; // Attach the decoded user data to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error('Token verification failed:', error);
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

// Export middleware functions for each role
export const verifyPrincipal = verifyRole(['principal']);
export const verifyTeacher = verifyRole(['teacher', 'student']);
export const verifyStudent = verifyRole(['student', 'principal','teacher']);
