const express = require('express');
const port = 8080;
 const app = express();

 app.listen(port, () =>{console.log(`Server started on port ${port}`)});

 app.get("/", (req,res) => {
    res.send("Hello from the dashboard !!");
 });

 app.get("/test", (req,res) =>{
    res.send("Hey there, this is the endpoint of the /test api");
 })
