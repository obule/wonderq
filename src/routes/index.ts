import express from 'express';
import { SQSRouter } from './queue.routes';

const router = express.Router();

router.use('/sqs', SQSRouter);

export { router as SimpleQueueRouter };
