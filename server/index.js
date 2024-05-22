import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import http from 'http';
import colors from 'colors';
import session from 'express-session';

import connectDB from './utils/connectDB.js';
import compileRoute from './routes/compileRoute.js';
import googleAuthRoute from './routes/googleAuthRoute.js';
import codeRoute from './routes/codeRoute.js';
import errorHandler from './middlewares/errorHandler.js';

const app = express();

connectDB();

app.use(cors(
    {
        origin: ['https://codelab-harshpx.vercel.app/','http://localhost:5173/'],
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
    }
));

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}));

app.route('/').get((req, res) => {
    res.json({message: 'API is running'});
});
app.use('/api/compile', compileRoute);
app.use('/api/auth', googleAuthRoute);
app.use('/api/codes', codeRoute);

app.use(errorHandler);

const server = http.createServer(app);

const port = process.env.PORT || 5000;
server.listen(port, () => {
    console.log('Server is running on port:', `${port}`.yellow.bold);
});