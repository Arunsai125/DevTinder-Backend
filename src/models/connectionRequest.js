import mongoose, {Schema} from "mongoose";

const connectionRequestSchema = new Schema({
    fromUserId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    toUserId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    status : {
        type: String,
        required : true,
        enum : {
            values : ["accepted", "rejected", "interested", "ignored"],
            message : `{VALUE} is not a valid field for status`
        }
    }
}, {timestamps : true});

connectionRequestSchema.index({fromUserId:1, toUserId:1});

connectionRequestSchema.pre("save", function(next){
    const connectionRequest = this;
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("Hey Attacker, You cant send yourself a connection request!!");
    }
    next();
});

const connectionRequestSchemaModel = new mongoose.model("connectionRequest", connectionRequestSchema);
export default connectionRequestSchemaModel;

