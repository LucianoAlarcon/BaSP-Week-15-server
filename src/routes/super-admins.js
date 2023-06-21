import express from 'express';
import superAdminsController from '../controllers/super-admins';
import validations from '../validations/super-admins';
import superAdminsValidation from '../validations/super-admins';

const router = express.Router();

router
  .get('/', superAdminsController.getAllSuperAdmins)
  .get('/:id', superAdminsController.getSuperAdminsById)
  .post('/', superAdminsController.createSuperAdmins)
  .put('/:id?', superAdminsValidation.validate, superAdminsController.updateSuperAdmin)
  .delete('/:id?', superAdminsController.deleteSuperAdmin);

export default router;
