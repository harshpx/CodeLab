import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import http from 'http';

import compileRoute from './routes/compileRoute.js';
import errorHandler from './middlewares/errorHandler.js';

const app = express();

app.use(cors(
    {
        origin: ['*'],
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['*'],
        credentials: true,
    }
));

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.route('/').get((req, res) => {
    res.json({message: 'API is running'});
});
app.use('/api/compile', compileRoute);

app.use(errorHandler);

const server = http.createServer(app);
;
const port = process.env.PORT || 5000;
server.listen(port, () => {
    console.log('Server is running on port:', port);
});