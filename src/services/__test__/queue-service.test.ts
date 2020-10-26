import { ProducerPayload } from '../../contracts/queue';
import { AVAILABILITY_TIME, SQS } from '../queue';

jest.useFakeTimers();

describe('.enqueueJob', () => {
  describe('with correct parameter', () => {
    it('succeeds', () => {
      const dataStore: ProducerPayload[] = [];
      const job = new SQS(dataStore);
      const addedJob = job.enqueueJob({ message: 'New Job 1' });
      expect(dataStore).toHaveLength(1);
      expect(dataStore.map((data) => data.message)).toEqual(['New Job 1']);
      expect(addedJob.id).toBeDefined();
    });
  });
});

describe('.getJobs', () => {
  let dataStore: ProducerPayload[] = [];
  let returnedJobs: ProducerPayload[] = [];
  let job: SQS;
  beforeAll(() => {
    dataStore = [
      { message: 'New Job 1', id: 'fhhhs', meta: { isAvailable: true } },
      { message: 'New Job 2', id: 'fhhhsdhhd', meta: { isAvailable: false } },
      { message: 'New Job 3', id: 'fhhhtwuws', meta: { isAvailable: true } },
    ];
    job = new SQS(dataStore);
  });

  describe('with valid amount', () => {
    it('returns data', () => {
      returnedJobs = job.getJobs(2);
      expect(returnedJobs).toHaveLength(2);
      expect(returnedJobs.map((job) => job.message)).toEqual(['New Job 1', 'New Job 3']);
      expect(returnedJobs.map((job) => job.meta.isAvailable)).toEqual([false, false]);
    });

    it('calls the timer fuction', () => {
      returnedJobs = job.getJobs(2);
      expect(dataStore.map((job) => job.meta.isAvailable)).toEqual([false, false, false]);
      // Fast-forward until all timers have been executed
      jest.runOnlyPendingTimers();
      expect(setTimeout).toHaveBeenCalledTimes(2);
      expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), AVAILABILITY_TIME);
      expect(dataStore.filter((data) => data.meta.isAvailable)).toHaveLength(2);

      expect(dataStore.map((job) => job.meta.isAvailable)).toEqual([true, false, true]);
    });
  });
});

describe('.dequeueJob', () => {
  let dataStore: ProducerPayload[] = [];
  let job: SQS;
  beforeEach(() => {
    dataStore = [
      { message: 'New Job 1', id: 'fhhhs', meta: { isAvailable: true } },
      { message: 'New Job 2', id: 'fhhhsdhhd', meta: { isAvailable: false } },
      { message: 'New Job 3', id: 'fhhhtwuws', meta: { isAvailable: true } },
    ];
    job = new SQS(dataStore);
  });
  describe('when job is available', () => {
    it('deletes job', () => {
      const dequeuedJob = job.dequeueJob('fhhhsdhhd');
      expect(dataStore).toHaveLength(2);
      expect(dataStore.map((data) => data.meta.isAvailable)).toEqual([true, true]);
      expect(dequeuedJob).toEqual(true);
    });
  });

  describe('when job is unavailable', () => {
    it('returns false', () => {
      const dequeuedJob = job.dequeueJob('fhhhs');
      expect(dataStore).toHaveLength(3);
      expect(dequeuedJob).toEqual(false);
    });
  });
});
