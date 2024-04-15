import User from "../models/usermodel.js";
import bcrypt from "bcryptjs";
import generatetoken from "../utils/generatetoken.js";


export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user?.password||"");

        if (!isPasswordCorrect) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        generatetoken(user._id, res);

        res.status(200).json({
            id: user._id,
            fullName: user.fullName,
            username: user.username,
            profilePic: user.profilePic
        });
    } catch (error) {
        console.log("Error in login controller:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const logout= async (req,res)=>{
    try {
        res.cookie("jwt","",{maxAge:0});
        res.status(500).json({message:"Logged out successfully"})
    } catch (error) {
        console.log("Error in logout controller")
        res.status(500),json({error:"Internal server error"})
    }
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
        generatetoken(newUser._id,res);
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