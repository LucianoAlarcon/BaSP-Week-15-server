import express from 'express';

import memberController from '../controllers/member';
import validateMember from '../validations/member';

const router = express.Router();

router
  .put('/:id', validateMember.validateMembersUpdate, memberController.updateMember)
  .delete('/:id', memberController.deleteMember)
  .get('/', memberController.getAllMembers)
  .get('/:id', memberController.getMembersById)
  .post('/', memberController.createMembers);

export default router;
