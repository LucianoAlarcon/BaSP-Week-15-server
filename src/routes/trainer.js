import express from 'express';

import trainersController from '../controllers/trainer';
import validations from '../validations/trainer';
import checkAuth from '../middlewares/authMiddleware';

const router = express.Router();

router
  .get('/', checkAuth(['SUPER_ADMIN', 'ADMIN']), trainersController.getAllTrainers)
  .get('/:id', checkAuth(['SUPER_ADMIN', 'ADMIN', 'TRAINER']), trainersController.getTrainerById)
  .post('/', checkAuth(['SUPER_ADMIN', 'ADMIN']), validations.validateCreation, trainersController.createTrainer)
  .put('/:id', checkAuth(['SUPER_ADMIN', 'ADMIN', 'TRAINER']), validations.validateUpdate, trainersController.updateTrainers)
  .delete('/:id', checkAuth(['SUPER_ADMIN', 'ADMIN']), trainersController.deleteTrainers);

module.exports = router;
