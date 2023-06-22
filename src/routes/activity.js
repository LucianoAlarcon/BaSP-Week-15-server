import express from 'express';
import activitiesController from '../controllers/activity';
import validations from '../validations/activity';
import checkAuth from '../middlewares/authMiddleware';

const router = express.Router();

router
  .get('/', checkAuth(['SUPER_ADMIN', 'ADMIN', 'TRAINER', 'MEMBER']), activitiesController.getAllActivities)
  .get('/:id', checkAuth(['SUPER_ADMIN', 'ADMIN', 'TRAINER', 'MEMBER']), activitiesController.getActivitiesById)
  .post('/', checkAuth(['SUPER_ADMIN', 'ADMIN']), validations.validateCreation, activitiesController.createActivities)
  .put('/:id', checkAuth(['SUPER_ADMIN', 'ADMIN', 'TRAINER', 'MEMBER']), validations.validateUpdate, activitiesController.updateActivities)
  .delete('/:id', checkAuth(['SUPER_ADMIN', 'ADMIN']), activitiesController.deleteActivities);

module.exports = router;
