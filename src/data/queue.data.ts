import { ProducerPayload } from '../contracts/queue';

export const queueSystem: ProducerPayload[] = [
  { message: 'New Job 1', id: 'fhhhs', meta: { isAvailable: true } },
  { message: 'New Job 2', id: 'fhhhsdhhd', meta: { isAvailable: false } },
  { message: 'New Job 3', id: 'fhhhtwuws', meta: { isAvailable: true } },
];
