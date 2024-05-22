import mongoose from "mongoose";

const codeSchema = new mongoose.Schema({
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    title:{
        type: String,
        required: true
    },
    code:{
        type: String,
        required: true
    },
    language:{
        type: String,
        required: true
    },
    input:{
        type: String,
        required: false
    },
}, {timestamps: true});

const codeModel = mongoose.model('Code', codeSchema);

export default codeModel;