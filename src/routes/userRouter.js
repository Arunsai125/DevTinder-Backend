import express from  "express";
import userAuth from  "../middleware/auth.js";
import connectionRequestSchemaModel from "../models/connectionRequest.js";
import userModel from "../models/user.js";

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

userRouter.get("/user/feed", userAuth, async (req,res) =>{
    try{
        const loggedInUser = req.user;
        // Get All the User Connections that loggedInUser has sent or ignored or accepted or rejected
        const userConnections = await connectionRequestSchemaModel.find(
            {$or : [{fromUserId : loggedInUser._id},{toUserId : loggedInUser._id}]}
        ).select("fromUserId toUserId").populate("fromUserId", ["firstName", "lastName"]).populate("toUserId", ["firstName", "lastName"]);

        // A new Set that stores unique id's of all the user connections with the user himself
        const toBeExcluded = new Set();
        userConnections.forEach((connection) => {toBeExcluded.add(connection.fromUserId._id.toString()); toBeExcluded.add(connection.toUserId._id.toString());});

        // Now we return all the users from the user db that aren't included in the set
        const userFeedData = await userModel.find({
            _id:{$nin:Array.from(toBeExcluded)}
        }).select(["_id", "firstName", "lastName", "age"]);

        res.json({message : `Hey ${loggedInUser.firstName}, Here are the list of few people you might be interested in`, data: {userFeedData} });
    }
    catch(err){
        res.status(400).send("Here's where it failed: " + err.message);
    }
});

export default userRouter;


