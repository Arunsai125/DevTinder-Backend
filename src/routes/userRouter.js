import express from  "express";
import userAuth from  "../middleware/auth.js";
import connectionRequestSchemaModel from "../models/connectionRequest.js";

const userRouter = express.Router();

userRouter.get("/user/requests/received", userAuth, async(req, res) =>{
    try{
        const loggedInUser = req.user;
        const connectionsRecieved = await connectionRequestSchemaModel.find({
            toUserId : loggedInUser._id,
            status: "interested"
        }).populate("fromUserId", ["firstName" , "lastName"]);
        res.json({message : `Hey ${loggedInUser.firstName}, Here's the data of all the connection requests that are waiting for approval`, data: {connectionsRecieved}});
    }
    catch(err){
        res.status(400).send("Something went wrong !!" + err.message);
    }
});

userRouter.get("/user/connections", userAuth, async(req,res) =>{
    try{
        const loggedInUser = req.user;
        const userConnections = await connectionRequestSchemaModel.find
        ({$or: [{toUserId : loggedInUser._id}, {fromUserId : loggedInUser._id}], status : "accepted"})
        .populate("fromUserId", ["firstName", "lastName"]).populate("toUserId", ["firstName", "lastName"]);
        const data = userConnections.map((row) => {
            if(row.fromUserId._id.toString() === loggedInUser._id.toString()) return row.toUserId;
            return row.fromUserId});
        res.json({message: `Hey ${loggedInUser.firstName}, Here's the data of your ${userConnections.length} connections`, data: {data}});

    }
    catch(err){
        res.status(400).send("Something went wrong: " + err.message);
    }
});

export default userRouter;


