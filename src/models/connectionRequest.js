import mongoose, {Schema} from mongoose;

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

const connectionRequestSchemaModel = new mongoose.model("connectionRequest", connectionRequestSchema);
export default connectionRequestSchemaModel;