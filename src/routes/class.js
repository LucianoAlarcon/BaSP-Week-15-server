import express from 'express';
import classController from '../controllers/class';
import validations from '../validations/class';
import checkAuth from '../middlewares/authMiddleware';


const router = express.Router();

router
  .put('/:id', checkAuth(['SUPER_ADMIN', 'ADMIN', 'TRAINER', 'MEMBER']), validations.validationUpdateClass, classController.updateClass)
  .delete('/:id', checkAuth(['SUPER_ADMIN', 'ADMIN']), classController.deleteClass)
  .get('/', checkAuth(['SUPER_ADMIN', 'ADMIN', 'TRAINER', 'MEMBER']), classController.getAllClasses)
  .get('/:id', checkAuth(['SUPER_ADMIN', 'ADMIN', 'TRAINER', 'MEMBER']), classController.getClassId)
  .post('/', checkAuth(['SUPER_ADMIN', 'ADMIN']), validations.validateCreation, classController.createClass);

module.exports = router;
