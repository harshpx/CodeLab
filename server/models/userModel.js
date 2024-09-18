import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userId:{
        type: String,
        required: true,
        unique: true,
    },
    displayName:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: false,
    },
    dp:{
        type: String,
    },
}, { timestamps: true });

const userModel = mongoose.model('User', userSchema);
export default userModel;