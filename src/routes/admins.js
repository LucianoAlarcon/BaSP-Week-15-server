
import express from 'express';
import { validateCreate, validateUpdate} from '../validations/admins';
import {
  getAllAdmins,
  getAdminById,
  createAdmin,
  deleteAdmin,
  updateAdmin,
} from '../controllers/admins';

const router = express.Router();

router
  .get('/', getAllAdmins)
  .get('/:id', getAdminById)
  .post('/', validateCreate, createAdmin)
  .put('/:id', validateUpdate, updateAdmin)
  .delete('/:id', deleteAdmin);

module.exports = router;
