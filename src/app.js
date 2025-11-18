import express from "express";
import connectDB from "../src/utils/database.js";
import userModel from "./models/user.js";
import validateData from "./utils/validation.js";
import bcrypt from "bcrypt";

const port = 8080;
const app = express();

connectDB().then(
    () => {
        console.log("DB Connection Successful !");
        app.listen(port, () =>{console.log(`Server started on port ${port}`)});
    }
).catch((err) => {console.error("DB Connection Failed !!" + err.message)});

app.use(express.json());

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
        if(!isValidationSuccess)  throw new Error ("Invalid credentials!!");
        else res.send("User Login Successful !");
    }
    catch(err){
        res.status(400).send("Something went wrong: " + err.message);
    }
});

app.get("/user", async (req, res) => {
    const userEmail = req.body.emailId;
    try{
        console.log(userEmail);
        const userFetched = await userModel.find({emailId : userEmail});
        if(userFetched.length === 0){
            res.status(404).send("User Not found, Make sure the emailId is correct !!");
        }   
        else { res.send(userFetched); }
    }
    catch(err){
        res.status(400).send("Something went Wrong !!");
    }
});


app.get("/feed", async (req,res) => {
    try{
        const allUsers = await userModel.find({});
        if(allUsers.length === 0){
            res.status(404).send("User Not found, Make sure the emailId is correct !!");
        }
        else{
            res.send(allUsers);
        }
    }
    catch(err){
        res.status(400).send("Something went wrong !!");
    }

});

app.get("/userWithId", async (req,res) => {
    try{
        const userIdInputted = req.body.userId;
        const userFetched = await userModel.findById( userIdInputted);
        if(!userFetched){
            res.status(404).send("User Not Found !!");
        }
        else{
            res.send(userFetched);
        }
    }
    catch(err){
        res.status(400).send("Something went wrong" + err.message);
    }
});


app.delete("/user", async (req,res) => {
    const userIdFromBody = req.body.userId;
    try{
        const deletedUser = await userModel.findByIdAndDelete(userIdFromBody);
        res.send("User Deletion Successful !");
    }
    catch(err){
        res.status(400).send("Something went Wrong !!");
    }
});


app.patch("/user/:userId", async(req, res) =>{
    const userId = req.params?.userId;
    const data = req.body;
    try{
        const ALLOWED_ENTRIES = ["age", "photoUrl", "gender"];
        const isValid = Object.keys(data).every((key) => ALLOWED_ENTRIES.includes(key));
        if(isValid){
            const updatedUser = await userModel.findByIdAndUpdate(userId, data);
            res.send("User updated Successfully !!");
        }
        else{
            res.status(400).send("Please enter the valid fileds to be updated");
        }
    }
    catch(err){
        res.status(400).send("Something went wrong !!" + err.message);
    }
});







