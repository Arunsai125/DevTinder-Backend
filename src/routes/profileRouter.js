import express from "express";
import userAuth from "../middleware/auth.js";
import {validateProfileEditableData} from  "../utils/validation.js";
import bcrypt from "bcrypt";
import validator from "validator";

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


profileRouter.patch("/profile/password", userAuth, async(req,res) =>{
    try{
        const{oldPassword, newPassword, confirmPassword} = req.body;
        const user = req.user;
        const isValidOldPassword = await bcrypt.compare(oldPassword, user.password);
        if(!isValidOldPassword) throw new Error("Please make sure you enter the correct current password !!");
        else{
            if(!validator.isStrongPassword(newPassword)) throw new Error("Please choose a strong password !!");
            if(newPassword !== confirmPassword) throw new Error("Please make sure your new password matches in both the fields !!");
            else{
                const newHashedPwd = await bcrypt.hash(newPassword,10);
                user.password = newHashedPwd;
                await user.save();
                res.json({message:`Hey ${user.firstName}, Your password has been updated successfully`, data: {newHashedPwd}});
            }
        }

    }   
    catch(err){
        res.status(400).send("Something went wrong: " + err.message);
    }
});

export default profileRouter;
