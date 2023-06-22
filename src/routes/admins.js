
import express from 'express';
import { validateCreate, validateUpdate} from '../validations/admins';
import {
  getAllAdmins,
  getAdminById,
  createAdmin,
  deleteAdmin,
  updateAdmin,
} from '../controllers/admins';
import checkAuth from '../middlewares/authMiddleware';

const router = express.Router();

router
  .get('/', checkAuth(['SUPER_ADMIN']), getAllAdmins)
  .get('/:id', checkAuth(['SUPER_ADMIN']), getAdminById)
  .post('/', checkAuth(['SUPER_ADMIN']), validateCreate, createAdmin)
  .put('/:id', checkAuth(['SUPER_ADMIN']), validateUpdate, updateAdmin)
  .delete('/:id', checkAuth(['SUPER_ADMIN']), deleteAdmin);

module.exports = router;
