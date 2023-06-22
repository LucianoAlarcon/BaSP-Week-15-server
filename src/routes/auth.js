import express from 'express';
import { validateLoginBody, validateRegisterBody } from '../validations/auth';
import {
  login,
  logout,
  register,
} from '../controllers/auth';

const router = express.Router();

router
  .post('/register', validateRegisterBody, register)
  .post('/login', validateLoginBody, login)
  .post('/logout', logout);

module.exports = router;
