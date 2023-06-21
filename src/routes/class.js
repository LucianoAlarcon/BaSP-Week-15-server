import express from 'express';
import classController from '../controllers/class';
import validations from '../validations/class';

const router = express.Router();

router
  .put('/:id', validations.validationUpdateClass, classController.updateClass)
  .delete('/:id', classController.deleteClass)
  .get('/', classController.getAllClasses)
  .get('/:id', classController.getClassId)
  .post('/', validations.validateCreation, classController.createClass);

export default router;
