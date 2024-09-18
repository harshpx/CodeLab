import express from 'express';
import {login, signup} from '../controllers/basicAuthController.js';

const basicAuthRoute = express.Router();

basicAuthRoute.route('/signup').post(signup);
basicAuthRoute.route('/login').post(login);

export default basicAuthRoute;