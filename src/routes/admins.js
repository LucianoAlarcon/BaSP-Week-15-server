import express from 'express';
import adminsController from '../controllers/admins';
import validations from '../validations/admins';

const router = express.Router();

router
  .get('/', adminsController.getAllAdmins)
  .get('/:id', adminsController.getAdminById)
  .post('/', validations.validateCreate, adminsController.createAdmin)
  .put('/:id', validations.validateUpdate, adminsController.updateAdmin)
  .delete('/:id', adminsController.deleteAdmin);

export default router;
