const express = require('express');
const port = 8080;
 const app = express();

 app.listen(port, () =>{console.log(`Server started on port ${port}`)});

 // GET
 app.get("/", (req,res) => {
    res.send("Hello from the dashboard !!");
 });

 // POST
 app.post("/data", (req,res) =>{
    res.send("Data saved to the database successfully!")
 });

 // DELETE
 app.delete("/file", (req,res) =>{
    res.send("The File has been successfully delted !!")
 });

 // GET with id
  app.get("/user/:userId", (req,res) =>{
    console.log(req.params);
    res.send({firstName : "arun", lastName: "sai"});
  })

  app.delete("/project/:projectId", (req,res) =>{
    console.log(req.params);
    res.send("The project has been deleted successfully !!");
  })

 app.get("/test", (req,res) =>{
    res.send("Hey there, this is the endpoint of the /test api");
 })






