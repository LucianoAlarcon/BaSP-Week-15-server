import express from 'express';

import subscriptionControllers from '../controllers/subscription';
import validateSubscription from '../validations/subscription';

const router = express.Router();

router
  .get('/', subscriptionControllers.getAllSubscriptions)
  .get('/:id', subscriptionControllers.getSubscriptionById)
  .post('/', validateSubscription.validateCreation, subscriptionControllers.createSubscription)
  .put('/:id?', validateSubscription.validateUpdate, subscriptionControllers.updateSubscription)
  .delete('/:id?', subscriptionControllers.deleteSubscription);

export default router;
