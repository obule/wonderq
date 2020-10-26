import { json } from 'body-parser';
import express from 'express';
import 'express-async-errors';
import { NotFoundError } from './errors/not-found-error';
import { errorHandler } from './middlewares/error-handlers';
import { currentUserRouter } from './routes/current-user';
import { SimpleQueueRouter } from './routes/index';

const app = express();

app.set('trust proxy', true);
app.use(json());

app.use(currentUserRouter);
app.use(SimpleQueueRouter);

app.all('*', async () => {
  throw new NotFoundError('Route not found');
});

app.use(errorHandler);

export { app };
