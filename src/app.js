import express from "express";
import {userAuth, adminAuth} from "./middleware/auth.js";


const port = 8080;
 const app = express();

 app.listen(port, () =>{console.log(`Server started on port ${port}`)});

 // GET
 app.get("/", (req,res) => {
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





