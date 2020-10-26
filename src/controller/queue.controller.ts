import { Request, Response } from 'express';
import { SQS } from '../services/queue';

export class SQSController {
  public postJob = (req: Request, res: Response) => {
    try {
      const { message } = req.body;
      const job = new SQS();

      const proccessedJob = job.enqueueJob({ message });
      return res.status(201).json(this.successMessage(proccessedJob, 'Job retrieved'));
    } catch (error) {
      return res.status(error.statusCode).send(this.errorMessage(error.message));
    }
  };

  public getJobs = (req: Request, res: Response) => {
    try {
      const numberOfJobs = parseInt(req.params.amount);
      const job = new SQS();
      const messages = job.getJobs(numberOfJobs);
      return res.status(200).json(this.successMessage(messages, 'Job retrieved'));
    } catch (error) {
      return res.status(error.statusCode).send(this.errorMessage(error.message));
    }
  };

  public processJob = (req: Request, res: Response) => {
    try {
      const { id } = req.body;
      const job = new SQS();
      const isJobProccessed = job.dequeueJob(id);
      const message = isJobProccessed ? 'Job successfully proccessed' : 'Job currently unavailable';
      return res.status(200).json(this.successMessage(isJobProccessed, message));
    } catch (error) {
      return res.status(error.statusCode).send(this.errorMessage(error.message));
    }
  };

  public successMessage(data: any, message: string) {
    return {
      success: true,
      data,
      message,
    };
  }
  public errorMessage(message: string) {
    return {
      success: false,
      message,
      data: null,
    };
  }
}
