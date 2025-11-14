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










