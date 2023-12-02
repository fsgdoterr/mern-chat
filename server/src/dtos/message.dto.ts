import { HydratedDocument } from "mongoose";
import { IMessage, IRawMessage } from "../interfaces/message.interface";

export default class MessageDto {

    constructor(
        private message: HydratedDocument<IRawMessage>
    ) {}

    getDto(): IMessage {
        return {
            id: this.message._id.toString(),
            senderId: this.message.senderId.toString(),
            receiverId: this.message.receiverId.toString(),
            body: this.message.body,
            createdAt: this.message.createdAt,
            updatedAt: this.message.updatedAt,
        }
    }

}