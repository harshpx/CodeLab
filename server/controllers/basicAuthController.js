import expressAsyncHandler from "express-async-handler";
import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import {v4 as uuidv4} from 'uuid';

const generateToken = (userId) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET);
    return token;
}

export const signup = expressAsyncHandler(async (req,res)=>{
    const {name, email, password} = req.body;

    if(!name || !email || !password){
        res.status(400);
        throw new Error('All fields are required');
    }

    const userExists = await userModel.findOne({email});
    if(userExists){
        res.status(400);
        throw new Error('Email already in use by another user');
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const uniqueId = uuidv4();
    const dp = `https://res.cloudinary.com/dgx2etbfc/image/upload/v1726689473/CharDPs/${name.charAt(0).toUpperCase()}_.png`;

    const user = await userModel.create({userId:uniqueId, displayName:name, email, password:hashedPassword, dp});
    
    if(user){
        res.status(201).json({
            displayName: user.displayName,
            email: user.email,
            token: generateToken(user.userId),
            dp: user.dp,
        });
    } else {
        res.status(400);
        throw new Error('User not created');
    }
})

export const login = expressAsyncHandler(async (req,res)=>{
    const {email, password} = req.body;

    if(!email || !password){
        res.status(400);
        throw new Error('All fields are required');
    }

    const user = await userModel.findOne({email});

    if(!user){
        res.status(400);
        throw new Error('User not found');
    }

    if(bcrypt.compare(password, user.password)){
        res.status(200).json({
            displayName: user.displayName,
            email: user.email,
            token: generateToken(user.userId),
            dp: user.dp,
        });
    } else {
        res.status(400);
        throw new Error('Invalid credentials');
    }
})