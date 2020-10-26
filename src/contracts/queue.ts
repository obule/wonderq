export type Meta = {
  isAvailable: boolean;
};

type SharedInput = {
  message: string;
};

export type Producer = SharedInput;

export type ProducerPayload = SharedInput & {
  id: string;
  meta: Meta;
};

export interface SimpleQuequeService {
  enqueueJob(payload: Producer): ProducerPayload;
  getJobs(amount: number): ProducerPayload[];
  dequeueJob(id: string): boolean;
}
