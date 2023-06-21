import express from 'express';

const router = express.Router();

import classes from './class';
import subscriptions from './subscription';
import admins from './admins';
import members from './member';
import superAdmins from './super-admins';
import trainers from './trainer';
import activities from './activity';
import auth from './auth'
import authMiddleware from '../middlewares/authMiddleware';

router.use('/classes', classes);
router.use('/members', members);
router.use('/admins', authMiddleware.verifyToken, admins);
router.use('/super-admins', superAdmins);
router.use('/subscriptions', subscriptions);
router.use('/trainers', trainers);
router.use('/activities', activities);
router.use('/auth', authMiddleware.verifyToken, auth);

export default router;
