import express from "express";
import connectDB from "./utils/database.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import authRouter from "./routes/authRouter.js";
import profileRouter from "./routes/profileRouter.js";
import requestRouter from "./routes/requestRouter.js";
import userRouter from "./routes/userRouter.js";

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
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);








