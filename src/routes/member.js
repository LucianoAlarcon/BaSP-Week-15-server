import express from 'express';

import memberController from '../controllers/member';
import validateMember from '../validations/member';
import checkAuth from '../middlewares/authMiddleware';

const router = express.Router();

router
  .put('/:id', checkAuth(['SUPER_ADMIN', 'ADMIN', 'MEMBER']), validateMember.validateMembersUpdate, memberController.updateMember)
  .delete('/:id', checkAuth(['SUPER_ADMIN', 'ADMIN']), memberController.deleteMember)
  .get('/', checkAuth(['SUPER_ADMIN', 'ADMIN']), memberController.getAllMembers)
  .get('/:id', checkAuth(['SUPER_ADMIN', 'ADMIN', 'MEMBER']), memberController.getMembersById)
  .post('/', validateMember.validateMembersCreation, memberController.createMembers);

module.exports = router;
