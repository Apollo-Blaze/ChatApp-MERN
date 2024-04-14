import User from "../models/usermodel.js";
import bcrypt from "bcryptjs";

export const login=(req,res)=>{
    console.log("loginUser");
    res.status(200).json("Welcome")
}
export const logout=(req,res)=>{
    console.log("logoutUser");
}
export const signup=async (req,res)=>{
    try{
        const {fullName,username,password,confirmPassword,gender} =req.body;

        //checking if the confirm password is same
        if(password!==confirmPassword){
            return res.status(400).json({error:"Passwords dont match"})
        }

        //checking if username already exists
        const user=await User.findOne({username});
        if(user){
            return res.status(400).json({error:"Username already exists"})
        }

        //hash password
        const hashPassword=await bcrypt.hash(password,10)

        //generate profile picture
        const boyProfilePic=`https://avatar.iran.liara.run/public/boy?username=${username}`
        const girlProfilePic=`https://avatar.iran.liara.run/public/girl?username=${username}`

        //send data to datatbase
        const newUser=new User({
            fullName,
            username,
            password:hashPassword,
            gender,
            profilePic: gender==="male"? boyProfilePic : girlProfilePic,
        })
        if(newUser){
        await newUser.save();
        res.status(201).json({
            _id:newUser._id,
            fullName:newUser.fullName,
            username:newUser.username,
            profilePic:newUser.profilePic
        })
        }
        else{
            res.status(400).json({error:"Invalid user data"})
        }
    }   
    catch(error){
        console.log("Error in signup controller")
        res.status(500),json({error:"Internal server error"})
    }
}