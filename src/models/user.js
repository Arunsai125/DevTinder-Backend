import {mongoose} from "mongoose";
import validator from 'validator';
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
        validate(value){
            if(!validator.isEmail(value)) throw new Error("Not a valid e-mail !!" + value);
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
        validate(value){
            if(!validator.isStrongPassword(value)) throw new Error("Not a strong password !!" + value);
        }
    },
    age:{
        type: Number,
        min: 18,
    },
    photoUrl:{
        type: String,
        default: "https://cdn.pixabay.com/photo/2021/11/24/05/19/user-6820232_1280.png",
        validate(value){
            if(!validator.isURL(value)) throw new Error("Not a valid URL !!" + value);
        }
    },
    gender:{
        type: String,
        validate(value){
            if(!["male","female","other"].includes(value)){
                throw new Error("Not a valid field for gender");
            }
        }
    }
},{timestamps : true});

const userModel = mongoose.model("User", userSchema);
export default userModel;