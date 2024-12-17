import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";
import { TryCatch } from "../utils/TryCatch.js";
import { generateToken } from "../utils/generatorToken.js";

// Register 
export const registerUser = TryCatch(async(req,res)=>{
    const {name,email,password} = req.body;
    let user = await User.findOne({email});
    if(user){
        return res.status(400).json({message:"Already have an account"})
    };
    const hashPassword = await bcrypt.hash(password,10);
    user = await User.create({
        name,email,password:hashPassword
    });
    
    // JSON Web Token
    generateToken(user._id,res);
    res.status(200).json({user,message:"User registered successfully!"});
})

// Login
export const loginUser = TryCatch(async(req,res)=>{
    const {email,password} = req.body;
    const user = await User.findOne({email});
    if(!user){
        return res.status(400).json({message:"Email or Password is incorrect"});
    }
    const comparePassword = await bcrypt.compare(password,user.password);
    if(!comparePassword){
        return res.status(400).json({message:"Email or Password is incorrect"})
    };
    // JSON Web Token
    generateToken(user._id,res);
    res.json({
        user,
        message:"User Logged in successfully!"
    })
})

// my profile
export const Myprofile = TryCatch(async(req,res)=>{
    const user = await User.findById(req.user._id);
    res.json(user);
})

// user profile
export const userProfile = TryCatch(async(req,res)=>{
    const user = await User.findById(req.params.id).select("-password");
    res.json(user);
})


// logout
export const logout = TryCatch(async(req,res)=>{
    res.cookie("token","",{maxAge:0});
    res.json({
        message:"Logged out succesfully!"
    })
})
