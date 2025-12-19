import express from "express";
import bcrypt from "bcrypt";
import userModel from "../models/user.js";
import validateData from "../utils/validation.js";

const authRouter = express.Router();

authRouter.post("/login", async(req, res) => {
    try{
        const{emailId, password} = req.body;
        const user = await userModel.findOne({emailId});
        if(!user) throw new Error("User Credentials are Invalid !!");
        const isValidPassword = await user.validatePassword(password);
        if(isValidPassword){
            const token = await user.getJWT();
            res.cookie("token", token);
            res.json({message : ` Hey ${user.firstName}, Welcome back!`, data: user});
        }
        else throw new Error("User Credentials are Invalid !!");
    }
    catch(err){
        res.status(400).send("OOPS!!, Youv'e ran into a trouble, Here's the info -> " + err.message);
    }
});

authRouter.post("/signup", async (req,res) =>{
    try{
        validateData(req);
        const{firstName, lastName, emailId, password} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const userData = new userModel({firstName, lastName, emailId, password: hashedPassword});
        await userData.save();
        res.send("User Registration Succesful, Please login to continue using your services !");
    }
    catch(err){
        res.status(400).send("OOPS!!, Youv'e ran into a trouble, Here's the info -> " + err.message);
    }

});

authRouter.get("/logout", async (req,res) => {
    res.cookie("token", null, {expires : new Date(Date.now())});
    res.send("Hey, Your Logout was successfull !!")
});

export default authRouter;