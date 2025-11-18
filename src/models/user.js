import {mongoose} from "mongoose";
const {Schema} = mongoose;

const userSchema = new Schema({
    firstName : {
        type: String,
        required : true,
        minLength: 4,
        maxLength: 20,
    },
    lastName : {
        type: String,
        minLength: 1
    },
    emailId : {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
    },
    age:{
        type: Number,
        min: 18,
    },
    photoUrl:{
        type: String,
        default: "https://cdn.pixabay.com/photo/2021/11/24/05/19/user-6820232_1280.png",
    },
    gender:{
        type: String,
        validate(value){
            if(!["male","female","other"].includes(value)){
                throw new Error("Not a valid field for gender");
            }
        }
    }
},{timestamp : true});

const userModel = mongoose.model("User", userSchema);
export default userModel;