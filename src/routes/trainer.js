import express from 'express';
import trainersController from '../controllers/trainer';
import validations from '../validations/trainer';

const router = express.Router();

router
  .get('/', trainersController.getAllTrainers)
  .get('/:id', trainersController.getTrainerById)
  .post('/', validations.validateCreation, trainersController.createTrainer)
  .put('/:id', validations.validateUpdate, trainersController.updateTrainers)
  .delete('/:id', trainersController.deleteTrainers);

export default router;
