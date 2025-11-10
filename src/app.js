import express from "express";
import {userAuth, adminAuth} from "./middleware/auth.js";
import connectDB from "../src/utils/database.js";


const port = 8080;
const app = express();

connectDB().then(
    () => {
        console.log("DB Connection Successful !");
        app.listen(port, () =>{console.log(`Server started on port ${port}`)});
    }
).catch((err) => {console.error("DB Connection Failed !!")});



 app.get("/test", (req,res) =>{
    throw new Error("test failed");
    res.send("User Data Sent");
 })

  // GET
 app.use("/", (err, req , res, next) => {
    if(err) res.status(500).send("Something went wrong in your code !!");
    res.send("Hello from the dashboard !!");
 });


 app.use("/login", (req,res) =>{
    res.send("This feature would be implemented soon!");
 });

 app.use("/user", userAuth);
 app.use("/admin",adminAuth);

 // POST
 app.post("/user/data", (req,res) =>{
    res.send("Data saved to the database successfully!")
 });

 // DELETE
 app.delete("/admin/file", (req,res) =>{
    res.send("The File has been successfully delted !!")
 });

 // GET with Id
  app.get("/user/:userId", (req,res) =>{
    console.log(req.params);
    res.send({firstName : "arun", lastName: "sai"});
  })

  // DELETE with Id
  app.delete("/admin/project/:projectId", (req,res) =>{
    console.log("Project with ID:", req.params);
    res.send("The project has been deleted successfully !!");
  })

  // Handling Multiple Route Handlers
  app.use("/route", (req,res,next)=>{
    console.log("Route Handler 1️⃣");
    next();
    //res.send("Handled RH1");
  },
  (req,res,next) =>{
    console.log("Route Handler 2️⃣");
    next();
    //res.send("Handled RH2");
  },
  (req,res,next) =>{
    console.log("Route Handler 3️⃣");
    next();
    res.send("Handled RH3");
  },
)





