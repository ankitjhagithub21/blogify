const User = require('../models/user')
const validator = require('validator');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const generateTokenAndSetCookie = (userId,res) =>{
    const token = jwt.sign({id:userId},process.env.JWT_SECRET,{expiresIn:"1d"})
    res.cookie('token',token,{
        httpOnly:true,
        secure:true,
        sameSite:"none",
        maxAge:1*24*60*60*1000
    })
}

const register = async(req,res) =>{
        try{
            const {fullName, email,password} = req.body;

            const existingEmail = await User.findOne({email})

            if(existingEmail){
                return res.status(400).json({
                    success:false,
                    message:"Email already exist."
                })
            }

            //email validation
            if(!validator.isEmail(email)){
                return res.status(400).json({
                    success:false,
                    message:"Please enter valid email address."
                })
            }

            //password validation

            if(!validator.isStrongPassword(password)){
                return res.status(400).json({
                    success:false,
                    message:"Please enter strong password."
                })
            }

            //hash password

            const hashedPassword = await bcrypt.hash(password,10)

            const user = new User({
                fullName,
                email,
                password:hashedPassword
            })

            await user.save();

            generateTokenAndSetCookie(user._id,res)

            res.status(201).json({
                success:true,
                message:"Account Created."
            })



        }catch(error){
            res.status(500).json({
                success:false,
                message:error.message
            })
        }
}
const login = async(req,res) =>{
    try{
        
        const {email,password} = req.body;

        const user = await User.findOne({email})

        if(!user){
            return res.status(400).json({
                success:false,
                message:"User not found."
            })
        }

        //compare password

        const isCorrect = await bcrypt.compare(password,user.password)

        if(!isCorrect){
            return res.status(400).json({
                success:false,
                message:"Wrong email or password."
            })
        }

        generateTokenAndSetCookie(user._id,res)

        res.status(200).json({
            success:true,
            message:`Welcome back ${user.fullName}`
        })


    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

const logout = async(req,res) =>{
   try{
    res.cookie('token','',{
        maxAge:0
    }).status(200).json({
        success:true,
        message:"Logout Successfull."
    }) 

    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

const getUser = async(req,res) =>{
    try{
        
        const user = await User.findById(req.userId).select("-password")
      
        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not found."
            })
        }
        res.status(200).json({
            success:true,
            user
        })
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

const EditProfile = async (req, res) => {
    try {
        // Extract the fields you want to allow for update from req.body
        const { name, bio, profileImageUrl } = req.body;

       
        if (!req.userId) {
            return res.status(400).json({
                success: false,
                message: "User ID is required."
            });
        }

        // Find and update the user by their ID
        const user = await User.findByIdAndUpdate(
            req.userId, 
            { fullName:name, bio, profilePic:profileImageUrl }, 
            { new: true, runValidators: true } 
        ).select("-password");

        // Check if the user exists
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        // Success response with the updated user data
        res.status(200).json({
            success: true,
            message:"Profile Updated successfully.",
            user
        });

    } catch (error) {
        // Error handling for unexpected cases
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};




module.exports = {
    register,
    login,
    logout,
    getUser,
    EditProfile
}