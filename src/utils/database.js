import mongoose from "mongoose";

const connectDB = async () =>{
    await mongoose.connect("mongodb+srv://arunsainarla:9JuQd2hjeHGnwTkw@namastenode.mqnqf0a.mongodb.net/devTinder");
};

export default connectDB;



