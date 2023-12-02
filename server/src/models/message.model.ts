import { Schema, model } from "mongoose";
import { IMessageModel, IRawMessage } from "../interfaces/message.interface";

const messageSchema = new Schema<IRawMessage, IMessageModel>({
    senderId: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    receiverId: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    body: {type: String, required: true},
}, {
    timestamps: true,
    versionKey: false,
});

const messageModel = model<IRawMessage, IMessageModel>('Message', messageSchema);

export default messageModel;