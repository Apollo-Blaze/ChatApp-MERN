import Conversation from "../models/conversation.model.js";
import Message from "../models/messaage.model.js";

export const sendMessage=async(req,res)=>{
   try {
    const {message}=req.body;
    const {id: recieverId}=req.params;
    const senderId=req.user._id;

    let conversation = await Conversation.findOne({
        participants:{$all:[senderId,recieverId]},
    })
    if(!conversation){
        conversation=await Conversation.create({
            participants:[senderId,recieverId]
        })
    }
    const newMessage=new Message({
        senderId,
        recieverId,
        message,
    })
    if(newMessage){
        conversation.messages.push(newMessage._id);
    }


    // await conversation.save();
    // await newMessage.save();
    //          ||
    //         \  /
    //          \/
    //to run in parallel we do:
    await Promise.all([conversation.save(),newMessage.save()]);


    res.status(201).json(newMessage);
   } catch (error) {
    console.log("Error in sendMessage controller: ",error.message)
    res.status(500).json({error:"Internal server error"})
   }
}

export const getMessages=async(req,res)=>{
    try {
        const {id:userToChatId}=req.params;
        const senderId=req.user._id;
        const conversation=await Conversation.findOne({
            participants:{$all:[senderId,userToChatId]},
        }).populate("messages");
        
        if (!conversation) {
            return res.status(404).json({ error: "Conversation not found" });
        }
        res.status(200).json(conversation.messages)
    } catch (error) {
    console.log("Error in getMessage controller: ",error.message)
    res.status(500).json({error:"Internal server error"})
    }
}