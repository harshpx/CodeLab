import express from 'express';
import { compile } from '../controllers/compile.js';

const compileRoute = express.Router();

compileRoute.route('/').post(compile);

export default compileRoute;