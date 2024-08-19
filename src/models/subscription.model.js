import { timeStamp } from "console";
import { type } from "express/lib/response";
import mongoose, {Schema} from "mongoose";

const subscriptionSchema = new Schema({
    subscriber: {
        type: Schema.Types.ObjectId,    // one who subscribing
        ref: 'User'
    },
    channel: {
        type: Schema.Types.ObjectId,    // channel being subscribed to
        ref: 'User'
    },
}, {timeStamp: true})


export const Subscription = mongoose.model("Subscription", subscriptionSchema)