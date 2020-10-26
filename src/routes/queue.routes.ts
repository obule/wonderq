import express from 'express';
import { body, param } from 'express-validator';
import { SQSController } from '../controller/queue.controller';
import { currentUser as requireAuth } from '../middlewares/current-user';
import { validateRequest } from '../middlewares/validate-request';

const router = express.Router();

const job = new SQSController();

router.post(
  '/add-job',
  requireAuth,
  [body('message').notEmpty().isString().trim().withMessage('Message is required')],
  validateRequest,
  job.postJob,
);
router.post(
  '/process-job',
  requireAuth,
  [body('id').notEmpty().isString().withMessage('Id is required')],
  validateRequest,
  job.processJob,
);
router.get(
  '/:amount',
  requireAuth,
  [param('amount').notEmpty().isNumeric().withMessage('Amount of message to process is required')],
  validateRequest,
  job.getJobs,
);

export { router as SQSRouter };
