import Router from 'express';
import authMiddleware from '../middlewares/auth.middleware';
import userController from '../controllers/user.controller';
import { body, query } from 'express-validator';
import validateMiddleware from '../middlewares/validate.middleware';
import fileMiddleware from '../middlewares/file.middleware';
import { FILE_SIZES, MIMETYPES } from '../utils/const';

const userRouter = Router();

userRouter.get(
    '/send-verification-message',
    authMiddleware,
    userController.sendVerificationMessage
);

userRouter.get(
    '/verif/:verificationCode',
    authMiddleware,
    userController.verif
);

userRouter.get(
    '/forgot-password/:email',
    userController.forgotPassword
);

userRouter.post(
    '/change-password',
    body('email')
        .isEmail()
        .withMessage(`You need to provide an email`),
    body('code')
        .notEmpty()
        .withMessage(`You need to provide an code`),
    body('password')
        .isLength({min: 6,max: 24})
        .withMessage('The password must be a minimum of 6 characters and a maximum of 24'),
    body('confirmPassword')
        .custom((val, { req }) => {
            if(val !== req.body.password)
                throw Error('Password mismatch');

            return true;
        }),
    validateMiddleware,
    userController.changePassword
);

userRouter.patch(
    '/',
    authMiddleware,
    body('email')
        .optional()
        .isEmail()
        .withMessage('Incorrect email'),
    body('name')
        .optional()
        .isString()
        .withMessage('Incorrect name'),
    validateMiddleware,
    fileMiddleware({
        avatar: {
            isArray: false,
            mimetypes: [MIMETYPES.IMAGE_JPEG, MIMETYPES.IMAGE_PNG, MIMETYPES.IMAGE_WEBP],
            maxSize: 15 * FILE_SIZES.MB,
        },
    }),
    userController.update
);

userRouter.get(
    '/',
    authMiddleware,
    userController.getAll
);


export default userRouter;