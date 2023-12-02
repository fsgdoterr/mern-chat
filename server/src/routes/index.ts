import Router from 'express';
import authRouter from './auth.routes';
import userRouter from './user.routes';
import messageRouter from './message.routes';

const router = Router();

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/message', messageRouter);

export default router;