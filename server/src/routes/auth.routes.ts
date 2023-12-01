import Router from 'express';
import { body } from 'express-validator';
import validateMiddleware from '../middlewares/validate.middleware';
import authController from '../controllers/auth.controller';

const authRouter = Router();

authRouter.post(
    '/signup',
    body('email')
        .isEmail()
        .withMessage('You must provide an email'),
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
    authController.signup
);

authRouter.post(
    '/signin',
    body('email')
        .notEmpty()
        .withMessage('You must provide an email'),
    body('password')
        .notEmpty()
        .withMessage('You must provide a password'),
    validateMiddleware,
    authController.signin
);

authRouter.get(
    '/refresh',
    authController.refresh,
);

authRouter.delete(
    '/logout',
    authController.logout,
);

export default authRouter;