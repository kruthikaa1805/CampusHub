const User=require('../models/user.model');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

const registerUser=async(req,res) => {
    try{
        const{name,email,password,role}=req.body;

        if(!name|| !email ||!password)
        {
            return res.status(400).json({
                message:"Please provide all required fields"
            })
        }
        const existingUser=await User.findOne({email});
        if(existingUser)
        {
            return res.status(400).json({
                message:" User already exists"
            })
        }
        const hashedPassword=await bcrypt.hash(password,10);

        const newUser=await User.create({
            name,
            email,
            password:hashedPassword,
            role:role||'student'
        });
        res.status(201).json({
            message:"User registered Successfully!",
            user: {
                _id:newUser._id,
                name: newUser.name,
                email:newUser.email,
                role:newUser.role
            }
        });
    }
    catch(error)
    {
        console.error('Registration Error:',error);
        res.status(500).json({
            message:"Server error", error: error.message
        }
        );
    }
};


const loginUser= async (req,res)=> {
    try{
        const{email,password}=req.body;

        if(!email||!password)
        {
            return res.status(400).json({
                message:"Please provide email and password"
            })
        }

        const user=await User.findOne({email});
        if(!user)
        {
            return res.status(400).json({
                message:"Invalid email or password"
            });
        }

        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch)
        {
            return res.status(400).json({
                message:"Invalid email or password"
            });
        }

        const token=jwt.sign(
            {
                id:user._id,
                role:user.role
            },process.env.JWT_SECRET,
            {expiresIn:'1d'}
        );

        res.status(200).json({
            message:"Login successful!",
            token:token,
            user: {
                _id:user._id,
                name: user.name,
                email:user.email,
                role:user.role
            }
        });
    }
    catch(error)
    {
        console.error("Login Error:",error);
        res.status(500).json({
            message:"Server Error",error:error.message
        });
    }
};
module.exports={registerUser,loginUser};