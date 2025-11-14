import express from "express";
import connectDB from "../src/utils/database.js";
import userModel from "./models/user.js";


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
const userData = new userModel(req.body);

try{
    await userData.save();
    res.send("User Data has been saved successfully!!");
}
    catch(err){
        res.status(400).send("Error saving the user : " + err.message);
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









