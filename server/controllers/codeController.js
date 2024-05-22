import Codes from '../models/codeModel.js';
import asyncHandler from 'express-async-handler';


export const getCodes = asyncHandler(async (req, res) => {
    const savedCodes = await Codes.find({createdBy: req.user._id});
    res.json(savedCodes);
});

export const createCode = asyncHandler(async (req, res) => {
    const {title, code, language, input} = req.body;
    if(!title || !code || !language){
        res.status(400);
        throw new Error("Please fill all the fields");
    }
    const newCode = await Codes.create({
        createdBy: req.user._id,
        title,
        code,
        language,
        input: input || '',
    });
    
    res.json(newCode);
});

export const updateCode = asyncHandler(async (req, res) => {
    const {title, code, input, language} = req.body;
    if(!title || !code || !language){
        res.status(400);
        throw new Error("Please fill all the fields");
    }
    const codeId = req.params.id;
    const updatedCode = await Codes.findByIdAndUpdate(codeId, {title, code, input:input || '', language}, {new: true});
    res.json(updatedCode);
});

export const deleteCode = asyncHandler(async (req, res) => {
    const codeId = req.params.id;
    await Codes.findByIdAndDelete(codeId);
    res.json({message: "Code deleted successfully"});
});