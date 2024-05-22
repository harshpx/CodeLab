import express from 'express';
import protectRoute from '../middlewares/authHandler.js';
import { getCodes, createCode, updateCode, deleteCode } from '../controllers/codeController.js';
const codeRoute = express.Router();

codeRoute.route('/').get(protectRoute, getCodes).post(protectRoute, createCode);
codeRoute.route('/:id').put(protectRoute, updateCode).delete(protectRoute, deleteCode);

export default codeRoute;