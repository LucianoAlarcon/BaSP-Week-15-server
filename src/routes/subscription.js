import express from 'express';

import subscriptionControllers from '../controllers/subscription';
import validateSubscription from '../validations/subscription';
import checkAuth from '../middlewares/authMiddleware';

const router = express.Router();

router
  .get('/', checkAuth(['SUPER_ADMIN', 'ADMIN']), subscriptionControllers.getAllSubscriptions)
  .get('/:id', checkAuth(['SUPER_ADMIN', 'ADMIN']), subscriptionControllers.getSubscriptionById)
  .post('/', checkAuth(['SUPER_ADMIN', 'ADMIN']), validateSubscription.validateCreation, subscriptionControllers.createSubscription)
  .put('/:id?', checkAuth(['SUPER_ADMIN', 'ADMIN']), validateSubscription.validateUpdate, subscriptionControllers.updateSubscription)
  .delete('/:id?', checkAuth(['SUPER_ADMIN', 'ADMIN']), subscriptionControllers.deleteSubscription);

module.exports = router;
