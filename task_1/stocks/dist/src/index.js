import 'dotenv/config';
import 'reflect-metadata';
import express from 'express';
import routes from './routes/index.js';
const app = express();
const port = process.env.PORT || 3001;
app.use(express.json());
app.get('/ping', (req, res) => {
    res
        .json({
        message: 'pong',
    })
        .status(200);
});
app.use(routes);
app.listen(port, () => {
    console.log('Server is running on PORT:', port);
});
