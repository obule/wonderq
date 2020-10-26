// import mongoose from 'mongoose';
import { app } from './app';

const start = async () => {
  app.listen(process.env.PORT, () => {
    console.log('Listening on port 3000!');
  });
};

start();
