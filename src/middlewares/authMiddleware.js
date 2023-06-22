import jwt from 'jsonwebtoken';
import Users from '../models/user';

const checkAuth = (roles) => async (req, res, next) => {
  try {
    const { token } = req.headers;
    const decoded = await jwt.verify(token, process.env.JWT_KEY);
    const user = await Users.findById(decoded.userId);
    // Check if the saved token matches with used on the request
    if (token !== user.token) {
      throw new Error('Invalid token');
    }
    if (!roles.includes(user.role)) {
      throw new Error('Invalid role');
    }
    next();
  } catch (error) {
    res.status(401).json({
      message: 'Unauthorize',
      data: undefined,
      error: error.toString(),
    });
  }
};

export default checkAuth;
