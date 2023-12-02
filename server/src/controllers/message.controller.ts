import { NextFunction, Request, Response } from "express";
import messageService from "../services/message.service";
import { IMessage } from "../interfaces/message.interface";

class MessageController {

    async sendMessage(req: Request, res: Response, next: NextFunction) {
        try {
            const {
                user: { id },
                params: { receiverId },
                body: { body },
            } = req;

            const message = await messageService.sendMessage(id, receiverId, body);

            res.json(message);
        } catch(e) {
            next(e);
        }
    }

    async getMessages(req: Request, res: Response, next: NextFunction) {
        try {
            const {
                user: { id },
                params: { userId },
                headers: { _limit, _offset },
            } = req;

            const messages = await messageService.getMessages(id, userId, Number(_limit) || 10, Number(_offset) || 0) as IMessage[];

            res.json(messages);
        } catch(e) {
            next(e);
        }
    }

    async getChats(req: Request, res: Response, next: NextFunction) {
        try {
            const {
                user: { id },
            } = req;

            const chats = await messageService.getChats(id);

            res.json(chats);
        } catch(e) {
            next(e);
        }
    }

}

export default new MessageController;