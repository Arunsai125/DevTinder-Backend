import express from "express";
import userAuth from "../middleware/auth.js";

const profileRouter = express.Router();

profileRouter.get("/profile", userAuth, async (req,res) =>{
    try{
        const userData = req.user;
        if(!userData) throw new Error("User not found!!");
        res.send(userData);
    }   
    catch(err){
        res.status(400).send("Something went wrong in fetching your details, Here are your logs --> " + err.message);
    }
});

export default profileRouter;
