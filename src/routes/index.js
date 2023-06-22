import express from 'express';

const router = express.Router();

import auth from './auth';
import classes from './class';
import subscriptions from './subscription';
import admins from './admins';
import members from './member';
import superAdmins from './super-admins';
import trainers from './trainer';
import activities from './activity';
import checkAuth from '../middlewares/authMiddleware';

router.use('/classes', checkAuth(['SUPER_ADMIN', 'ADMIN', 'TRAINER', 'MEMBER']), classes);
router.use('/auth', auth)
router.use('/members', checkAuth(['SUPER_ADMIN', 'ADMIN']), members);
router.use('/admins', checkAuth(['SUPER_ADMIN']), admins);
router.use('/super-admins', superAdmins);
router.use('/subscriptions', checkAuth(['SUPER_ADMIN', 'ADMIN']), subscriptions);
router.use('/trainers', checkAuth(['SUPER_ADMIN', 'ADMIN']), trainers);
router.use('/activities', checkAuth(['SUPER_ADMIN', 'ADMIN', 'TRAINER', 'MEMBER']), activities);

module.exports = router;
