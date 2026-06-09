import bycrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
const registerUser=async (req,res)=>
{
    // Implementation for user registration
    const {name,email,password}=req.body;
    try{
        // Check if user already exists
        const existingUser=await User.findOne({email});
        if(existingUser){ 
            return res.status(400).json({message:"User already exists"});
        }
        
        
        // Create new user
        const hashPass=await bycrypt.hash(password,10);
        const newUser=await User.create({name,email,password:hashPass});
        res.status(201).json({message:"User registered successfully",user:newUser});
        const token =jwt.sign({_id:newUser._id,email:email},process.env.JWT_KEY,{expiresIn:60*60});
        res.cookie('token',token,{maxAge:60*60*1000});
    }catch(error){
        res.status(500).json({message:"Error registering user",error:error.message});
    }
}

const loginUser=async (req,res)=>
{
    // Implementation for user login
    const {email,password}=req.body;                        
    try{
        // Check if user exists
        const user=await User.findOne({email}); 
        if(!user){
            return res.status(400).json({message:"Invalid credentials"});
        }
        // Check if password is correct
        const isMatch=await bycrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({message:"Invalid credentials"});
        }
        // Generate token
        const token=jwt.sign({_id:user._id,email:user.email},process.env.JWT_KEY,{expiresIn:60*60});
        res.cookie('token',token,{maxAge:60*60*1000});
        res.json({message:"Login successful",token,user});
    }catch(error){
        res.status(500).json({message:"Error logging in",error:error.message});
    }
}

export {registerUser,loginUser};