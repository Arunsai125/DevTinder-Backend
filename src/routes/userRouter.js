import express from  "express";
import userAuth from  "../middleware/auth.js";
import connectionRequestSchemaModel from "../models/connectionRequest.js";

const userRouter = express.Router();

userRouter.get("/user/requests/recieved", userAuth, async(req, res) =>{
    try{
        const loggedInUser = req.user;
        const connectionsRecieved = await connectionRequestSchemaModel.find({
            toUserId : loggedInUser._id,
            status: "interested"
        });
        res.json({message : `Hey ${loggedInUser.firstName}, Here's the data of all the connection request that are waiting for approval`, data: {connectionsRecieved}});
    }
    catch(err){
        res.status(400).send("Something went wrong !!" + err.message);
    }
});

export default userRouter;