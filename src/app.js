import express from 'express';
import connect from './db/mongoose';
import cors from 'cors';
import { errors } from 'celebrate';
import routes from './routes/index';
connect();
const app = express();
app.use(
  cors({
    origin: [
      'https://concoe-coffee-and-foods-production.up.railway.app',
      'https://personal-server-3fvv.onrender.com',
    ],
  })
);
app.use(express.json());
app.use(errors());
app.use(routes);
app.get('/', (req, res) => {
  return res.status(200).send('Home');
});
app.use((req, res) => {
  return res.status(404).json({ message: 'resource not found' });
});

export default app;
