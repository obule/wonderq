import request from 'supertest';
import { app } from '../../app';

const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFkbWluIEFkbWluIiwiaWF0IjoxNTE2MjM5MDIyLCJyb2xlIjoiYWRtaW4ifQ.9v5NoVLOjyj5HZwPkPFKb73heDebRT-WsohLqoPO8Qk`;

describe('SQSRoutes', () => {
  describe('.postJob', () => {
    describe('without a token', () => {
      it('returns a 401 unauthorize request', async () => {
        await request(app)
          .post('/sqs/add-job')
          .send({
            message: 'Hello',
          })
          .expect(401);
      });
    });

    describe('with a token', () => {
      describe('without a body', () => {
        it('returns 400 without a message in the body', async () => {
          const response = await request(app)
            .post('/sqs/add-job')
            .set({ authorization: token })
            .send({})
            .expect(400);
          expect(response.body.errors.length).toBeGreaterThanOrEqual(1);
        });
      });

      describe('with a message in the body', () => {
        it('should create a job', async () => {
          const response = await request(app)
            .post('/sqs/add-job')
            .set({ authorization: token })
            .send({
              message: 'Hello',
            })
            .expect(201);

          expect(response.body.message).toEqual('Job retrieved');
          expect(response.body.data.message).toEqual('Hello');
        });
      });
    });
  });

  describe('.processJob', () => {
    describe('without a token', () => {
      it('returns a 401 unauthorize request', async () => {
        await request(app)
          .post('/sqs/process-job')
          .send({
            id: 1,
          })
          .expect(401);
      });
    });

    describe('with a token', () => {
      describe('without a body', () => {
        it('returns 400 without a id in the body', async () => {
          const response = await request(app)
            .post('/sqs/process-job')
            .set({ authorization: token })
            .send({})
            .expect(400);
          expect(response.body.errors.length).toBeGreaterThanOrEqual(1);
        });
      });

      describe('with a id in the body', () => {
        describe('when the job is available', () => {
          it('returns false', async () => {
            const response = await request(app)
              .post('/sqs/process-job')
              .set({ authorization: token })
              .send({
                id: 'fhhhs',
              })
              .expect(200);

            expect(response.body.data).toEqual(false);
            expect(response.body.message).toEqual('Job currently unavailable');
          });
        });

        describe('when the job is unavailable', () => {
          it('should processed the job', async () => {
            const response = await request(app)
              .post('/sqs/process-job')
              .set({ authorization: token })
              .send({
                id: 'fhhhsdhhd',
              })
              .expect(200);

            expect(response.body.data).toEqual(true);
            expect(response.body.message).toEqual('Job successfully proccessed');
          });
        });
      });
    });
  });
});
