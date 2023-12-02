import Router from 'express';
import authMiddleware from '../middlewares/auth.middleware';
import { body } from 'express-validator';
import validateMiddleware from '../middlewares/validate.middleware';
import messageController from '../controllers/message.controller';

const messageRouter = Router();

messageRouter.post(
    '/:receiverId',
    authMiddleware,
    body('body')
        .notEmpty()
        .withMessage('You must type your message'),
    validateMiddleware,
    messageController.sendMessage
)

messageRouter.get(
    '/:userId',
    authMiddleware,
    messageController.getMessages
);

messageRouter.get(
    '/',
    authMiddleware,
    messageController.getChats,
)

export default messageRouter;