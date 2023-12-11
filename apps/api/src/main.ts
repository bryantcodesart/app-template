import express from 'express';
import payload from 'payload';
// import './payload.config';
import ENV from './env';

const start = async () => {
  const app = express();

  await payload.init({
    secret: ENV.PAYLOAD_SECRET,
    express: app,
  });

  app.get('/', (req, res) => {
    res.send({ message: 'Hello API' });
  });

  app.listen(ENV.PORT, ENV.HOST, () => {
    console.log(`[ ready ] http://${ENV.HOST}:${ENV.PORT}`);
  });
};

start();
