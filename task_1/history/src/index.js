import 'dotenv/config'
import express from 'express';
import HistoryRouter from './routes/history.router.js';
import { listenForHistoryActions } from './services/rabbitMq.service.js';

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());


app.use('/api', HistoryRouter)

app.get('/ping', (req, res) => {
  res
    .json({
      message: 'pong',
    })
    .status(200);
});


app.listen(port, async () => {
  console.log('Server is running on PORT:', port);
  await listenForHistoryActions()
});
