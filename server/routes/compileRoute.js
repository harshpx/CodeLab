import express from 'express';
import { compile } from '../controllers/compileController.js';

const compileRoute = express.Router();

compileRoute.route('/').post(compile);

export default compileRoute;