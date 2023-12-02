import { Model, Types } from "mongoose";

export interface IRawMessage {
    senderId: Types.ObjectId;
    receiverId: Types.ObjectId;
    body: string;
    createdAt: Date;
    updatedAt: Date;
};

export interface IMessage {
    id: string;
    senderId: string;
    receiverId: string;
    body: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface IMessageModel extends Model<IRawMessage> {};