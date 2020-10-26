import crypto from 'crypto';
import { Producer, ProducerPayload, SimpleQuequeService } from '../contracts/queue';
import { queueSystem } from '../data/queue.data';

export const AVAILABILITY_TIME = parseInt(process.env.AVAILABILITY_TIME || '30000'); // 5 minutes to milliseconds

export class SQS implements SimpleQuequeService {
  public constructor(private queueSystemData = queueSystem) {}

  public enqueueJob = (payload: Producer): ProducerPayload => {
    const id = crypto.randomBytes(20).toString('hex');
    const data = {
      id,
      message: payload.message,
      meta: {
        isAvailable: true,
      },
    };

    this.queueSystemData.push(data);
    return data;
  };

  public getJobs = (amount: number): ProducerPayload[] => {
    //   get available jobs
    const availableJobs = this.queueSystemData.filter((job) => job.meta.isAvailable);
    const selectedJobs = availableJobs.slice(0, amount);
    // get selected job ids
    const selectedJobsIds = selectedJobs.map((job) => job.id);
    // Update the selected jobs availabilty status
    this.updateJobStatus(selectedJobsIds, false);
    // Set time out
    this.timeOutJob(selectedJobsIds);

    return selectedJobs;
  };

  private updateJobStatus = (jobIds: string[], status: boolean): void => {
    this.queueSystemData.forEach((data) => {
      if (jobIds.includes(data.id)) {
        data.meta.isAvailable = status;
      }
    });
  };

  public dequeueJob = (id: string): boolean => {
    const selectedJob = this.queueSystemData.findIndex(
      (job) => job.id === id && job.meta.isAvailable === false,
    );
    if (selectedJob < 0) return false;
    // Delete job

    this.queueSystemData.splice(selectedJob, 1);

    return true;
  };

  private timeOutJob(selectedJobsIds: string[]) {
    setTimeout(() => {
      this.updateJobStatus(selectedJobsIds, true);
    }, AVAILABILITY_TIME);
  }
}
