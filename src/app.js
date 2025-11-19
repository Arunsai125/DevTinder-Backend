import express from "express";
import connectDB from "./utils/database.js";
import userModel from "./models/user.js";
import validateData from "./utils/validation.js";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import userAuth from "./middleware/auth.js";

dotenv.config();
const port = 8080;
const app = express();

connectDB().then(
    () => {
        console.log("DB Connection Successful !");
        app.listen(port, () =>{console.log(`Server started on port ${port}`)});
    }
).catch((err) => {console.error("DB Connection Failed !!" + err.message)});

app.use(express.json());
app.use(cookieParser());

app.post("/signup", async(req, res) =>{
    try{
        validateData(req);
        const {firstName, lastName, emailId, password} = req.body;
        const pwdHashed = await bcrypt.hash(password, 10);
        const userData = new userModel({
            firstName, lastName, emailId, password: pwdHashed
        });
        await userData.save();
        res.send("User Data has been saved successfully!!");
    }
        catch(err){
            res.status(400).send("Error saving the user : " + err.message);
        }
});

app.post("/login", async(req, res) =>{
    try{
        const {emailId, password} = req.body;
        const user = await userModel.findOne({emailId});
        if(!user) throw new Error ("Invalid credentials!!");
        const isValidationSuccess = await bcrypt.compare(password, user.password);
        if(isValidationSuccess){
            const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY);
            res.cookie("token", token);
            res.send("User Login Successful !");
        }
        else throw new Error ("Invalid credentials!!");

    }
    catch(err){
        res.status(400).send("Something went wrong: " + err.message);
    }
});


app.get("/profile", userAuth, async (req,res) =>{
    try{
        const userData = req.user;
        if(!userData) throw new Error("User not found!!");
        res.send(userData);
    }
    catch(err){
        res.status(400).send("Error:" + err.message);
    }

});







