import express from 'express';
import {
  login,
  logout,
  register,
} from '../controllers/auth';
import { validateLoginBody, validateRegisterBody } from '../validations/auth';

const router = express.Router();

router
  .post('/register', validateRegisterBody, register)
  .post('/login', validateLoginBody, login)
  .post('/logout', logout);

export default router;
