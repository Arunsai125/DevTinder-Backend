import express from "express";
import userAuth from "../middleware/auth.js";
import {validateProfileEditableData} from  "../utils/validation.js";
import bcrypt from "bcrypt";

const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth, async (req,res) =>{
    try{
        const userData = req.user;
        if(!userData) throw new Error("User not found!!");
        res.send(userData);
    }   
    catch(err){
        res.status(400).send("Something went wrong in fetching your details, Here are your logs --> " + err.message);
    }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) =>{
    try{
        if(!validateProfileEditableData(req)) throw new Error("Invalid fields are present which are not eligible to be editable by user!!");
        const loggedInUser = req.user;
        Object.keys(req.body).forEach(key => loggedInUser[key] = req.body[key]);
        await loggedInUser.save();
        res.json({message : `Hey ${loggedInUser.firstName} ${loggedInUser.lastName} Your details were updated as per your request, Please find the details below: `, data : loggedInUser} );
    }
    catch(err){
        res.status(400).send("Something went while editing your details, Here are your logs --> " + err.message);
    }
});

profileRouter.patch("/profile/password", userAuth, async (req, res) =>{
    try{
        const user = req.user;
        const {oldPassword, newPassword, confirmPassword} = req.body;
        const isOldPasswordCorrect = await bcrypt.compare(oldPassword, user.password);
        if(!isOldPasswordCorrect) throw new Error("Please enter your correct current password!!");
        else{
            if(newPassword !== confirmPassword) throw new Error("Your newPassword doesn't match, please reconfirm it!!");
            else{
                const newHashedPassword = await bcrypt.hash(newPassword, 10);
                user.password = newHashedPassword;
                await user.save();
                res.send(`Hey ${user.firstName} ${user.lastName} Your password has been updated successfully !!!`);
            }
        }
    }
    catch(err){
        res.status(400).send("OOPS!!, Here's the error youv'e accidentally ran into -> " + err.message);
    }

});

export default profileRouter;
