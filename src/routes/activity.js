import express from 'express';
import activitiesController from '../controllers/activity';
import validations from '../validations/activity';

const router = express.Router();

router
  .get('/', activitiesController.getAllActivities)
  .get('/:id', activitiesController.getActivitiesById)
  .post('/', validations.validateCreation, activitiesController.createActivities)
  .put('/:id', validations.validateUpdate, activitiesController.updateActivities)
  .delete('/:id', activitiesController.deleteActivities);

export default router;
