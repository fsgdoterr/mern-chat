import { Types } from "mongoose";
import MessageDto from "../dtos/message.dto";
import { IMessage } from "../interfaces/message.interface";
import { IPublicUser } from "../interfaces/user.interface";
import messageModel from "../models/message.model";
import ApiError from "../utils/error";
import userModel from "../models/user.model";
import UserDTO from "../dtos/user.dto";

class MessageService {

    async sendMessage(
        senderId: string, 
        receiverId: string, 
        body: string
    ): Promise<IMessage> {
     
        if(senderId === receiverId)
            throw ApiError.badRequest(`You can't send a message to yourself`);

        const message = await messageModel.create({
            senderId: senderId,
            receiverId,
            body,
        });

        const messageDto = new MessageDto(message);

        return messageDto.getDto();
    }

    async getMessages(
        senderId: string,
        receiverId: string,
        limit: number = 10,
        offset: number = 0,
    ): Promise<IMessage[]> {

        const messages = await messageModel.find({
            $or: [
                {senderId, receiverId},
                {senderId: receiverId, receiverId: senderId},
            ],
        }).limit(limit).skip(offset);

        const messageDtos = messages.map(m => new MessageDto(m));

        return messageDtos.map(dto => dto.getDto());
    }

    async getChats(
        userId: string,
    ): Promise<IPublicUser[]> {

        const uniqueUsers = await messageModel.aggregate([
            {
                $match: {
                    $or: [
                        {senderId: new Types.ObjectId(userId)},
                        {receiverId: new Types.ObjectId(userId)},
                    ],
                },
            },
            {
                $group: {
                    _id: null,
                    userIds: {
                        $addToSet: {
                            $cond: [
                                {$eq: ['$senderId', new Types.ObjectId(userId)]},
                                '$receiverId',
                                '$senderId',
                            ],
                        },
                    },
                },
            },
            {
                $project: {
                    _id: 0,
                    userIds: 1,
                },
            },
        ]);

        if(uniqueUsers.length === 0) {
            return [];
        }

        const userIds = uniqueUsers[0].userIds;

        const users = await userModel.find({_id: {$in: userIds}});

        const userDtos = users.map(u => new UserDTO(u));

        return userDtos.map(dto => dto.getPublicDto());
    }
}

export default new MessageService;