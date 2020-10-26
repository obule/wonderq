let mongo: any;
beforeAll(async () => {
  process.env.JWT_KEY = 'affsyyd';
  process.env.AVAILABILITY_TIME = '30000';
});
