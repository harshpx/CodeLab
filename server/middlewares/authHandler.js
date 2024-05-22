import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler';

const protectRoute = asyncHandler(async (req,res,next) => {
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token,process.env.JWT_SECRET);
            const currUser = await User.findOne({userId: decoded.userId});
            if(!currUser){
                res.status(404);
                throw new Error('User not found / invalid token');
            }
            req.user = currUser;
            // console.log('auth success');
            next();
        } catch (error) {
            res.status(401);
            throw new Error('Not authorized, token failed');
        }
    }
    if(!token){
        res.status(401);
        throw new Error('Not authorized, no token');
    }
});

export default protectRoute;