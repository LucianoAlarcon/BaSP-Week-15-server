import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import APIError from '../utils/APIError';

export const login = async (req, res) => {
  const {
    email,
    password
  } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('Invalid user credentials');
    }
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      const token = jwt.sign(
        {
          email: user.email,
          // eslint-disable-next-line no-underscore-dangle
          userId: user._id,
          role: user.role,
        },
        process.env.JWT_KEY,
        {
          /** expressed in seconds or a string describing a time span [zeit/ms](https://github.com/zeit/ms.js).
           * Eg: 60, "2 days", "10h", "7d" */
          expiresIn: '1d',
        },
      );
      const updatedUser = await User.findOneAndUpdate(
        { email: req.body.email },
        { token },
        { new: true },
      );
      return res.status(200).json({
        message: 'User Logged',
        data: {
          email: updatedUser.email,
          // eslint-disable-next-line no-underscore-dangle
          _id: updatedUser._id,
          role: updatedUser.role,
          token: updatedUser.token,
        },
      });
    }
    throw new APIError({
      message: 'Invalid credentials',
      status: 400,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      message: error.message || error,
      error: true,
    });
  }
};

export const logout = async (req, res) => {
  try {
    const decoded = await jwt.verify(req.headers.token, process.env.JWT_KEY);
    const user = await User.findById(decoded.userId);
    if (!user) {
      throw new APIError({
        message: 'Invalid user credentials',
        status: 400,
      });
    }
    const updatedUser = await User.findByIdAndUpdate(
      decoded.userId,
      { token: '' },
      { new: true },
    );
    return res.status(200).json({
      message: 'Success logout',
      data: {
        email: updatedUser.email,
        // eslint-disable-next-line no-underscore-dangle
        _id: updatedUser._id,
      },
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      message: error.message || error,
      error: true,
    });
  }
};

export const register = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const userCreated = new User({
      email: req.body.email,
      password: hashedPassword,
    });
    const userSaved = await userCreated.save();
    return res.status(201).json({
      message: 'User created',
      data: userSaved,
    });
  } catch (error) {
    return res.status(400).json({ message: error.toString() });
  }
};
