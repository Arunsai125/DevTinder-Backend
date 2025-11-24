import express from "express";
import userAuth from  "../middleware/auth.js";
import connectionRequestSchemaModel from "../models/connectionRequest.js";
import userModel from "../models/user.js";


const requestRouter = express.Router();

requestRouter.post("/request/send/:status/:userId", userAuth, async (req,res) =>{
    try{
        const status = req.params.status;
        const toUserId = req.params.userId;
        const fromUser = req.user;
        const fromUserId = fromUser._id;


        const STATUS_ALLOWED = ["interested", "ignored"];
        if(!STATUS_ALLOWED.includes(status)) throw new Error("Invalid Connection Request !!!");

        const doesToUserExist = await userModel.findById(toUserId);
        if(!doesToUserExist) throw new Error("The connection Request cannot be made to the users outside of this platform!!!");

        const doesConnectionRequestExists = await connectionRequestSchemaModel.findOne({
            $or : [{fromUserId, toUserId},{fromUserId : toUserId, toUserId:fromUserId}]
        });
        if(doesConnectionRequestExists) throw new Error("Hey, This connection request between " + fromUser.firstName + " and " + doesToUserExist.firstName  + " already exists");

        
        const connRequest = new connectionRequestSchemaModel({fromUserId, toUserId, status});
        const connRequestData = await connRequest.save();
    res.json({message : `The request was successfully sent`, data : connRequestData });
    }
    catch(err){
        res.status(400).send("OOPS!! You've ran into an error, Here are the logs --> " + err.message);
    }
});

export default requestRouter;


