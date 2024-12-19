import mongoose from 'mongoose';

const receipeSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    ingredients:{
        type:[String],
        required:true
    },
    instructions:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true,
        enum:['Appetizer','Main Course','Dessert','Snack','Beverage']
    },
    image:{
        id:String,
        url:String
    }
},{timestamps:true});

export const Receipe = mongoose.model('receipe',receipeSchema);
