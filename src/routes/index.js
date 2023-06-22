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

router.use('/classes', classes);
router.use('/auth', auth)
router.use('/members', members);
router.use('/admins', admins);
router.use('/super-admins', superAdmins);
router.use('/subscriptions', subscriptions);
router.use('/trainers', trainers);
router.use('/activities', activities);

module.exports = router;
