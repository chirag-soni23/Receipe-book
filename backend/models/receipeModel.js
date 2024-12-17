import mongoose from "mongoose";

const receipeSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    ingredients:{
        type:[String],
        required:true,
    },
    instruction:{
        type:String,
        required:true
    },
    category:{
        type:String,
        enum: ['appetizer', 'main course', 'dessert', 'snack', 'other'],
        default:'other',
    },
    image:{
        id: String,
        url: String
    }
},{timestamps:true});

export const Receipe = mongoose.model('receipe',receipeSchema);