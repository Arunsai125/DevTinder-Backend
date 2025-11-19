import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import userModel from "../models/user.js";

dotenv.config();

const userAuth = async (req,res,next) => {
    try{
        const {token} = req.cookies;
        if(!token) throw new Error("Not a valid token !!");
        const decodedObject = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const {_id} = decodedObject;
        const user =  await userModel.findById(_id);
        if(!user) throw new Error("User data not found!!");
        else req.user = user;
        next();
    }
    catch(err){
        res.status(400).send("OOPS!!, You've ran into error -->  " + err.message);
    }
};

export default userAuth;