import User from "../models/usermodel.js";

export const login=(req,res)=>{
    console.log("loginUser");
}
export const logout=(req,res)=>{
    console.log("logoutUser");
}
export const signup=async (req,res)=>{
    try{
        const {fullName,username,password,confirmPassword,gender} =req.body;
        if(password!==confirmPassword){
            return res.status(400),json({error:"Passwords dont match"})
        }
        const user=await User.findOne({username});
        if(user){
            return res.status(400),json({error:"Username already exists"})
        }
        const boyProfilePic=`https://avatar.iran.liara.run/public/boy?username=${username}`
        const girlProfilePic=`https://avatar.iran.liara.run/public/girl?username=${username}`

        const newUser=new User({
            fullName,
            username,
            password,
            gender,
            profilePic: gender==="male"?boyProfilePic:girlProfilePic
        })
        await newUser.save();
        res.statuse(201).json({
            _id:newUser._id,
            fullName:newUser.fullName,
            username:newUser.username,
            profilePic:newUser.profilePic
        })
    }   
    catch(error){
        console.log("Error in signup controller")
        res.status(500),json({error:"Internal server error"})
    }
}