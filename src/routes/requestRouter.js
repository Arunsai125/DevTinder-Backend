import express from "express";
import userAuth from  "../middleware/auth.js";
import connectionRequestSchemaModel from "../models/connectionRequest.js";



const requestRouter = express.Router();

requestRouter.post("/request/send/:status/:userId", userAuth, async (req,res) =>{
    try{
        const status = req.params.status;
        const toUserId = req.params.userId;
        const fromUser = req.user;
        const fromUserId = fromUser._id;
        const STATUS_ALLOWED = ["interested", "ignored"];
        if(!STATUS_ALLOWED.includes(status)) throw new Error("Invalid Connection Request !!!");
        const connRequest = new connectionRequestSchemaModel({fromUserId, toUserId, status});
        const connRequestData = await connRequest.save();
    res.json({message : `The request was successfully sent`, data : connRequestData });
    }
    catch(err){
        res.status(400).send("OOPS!! You've ran into an error, Here are the logs --> " + err.message);
    }
});

export default requestRouter;
