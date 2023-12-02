import { NextFunction, Request, Response } from "express";
import userService from "../services/user.service";
import tokenService from "../services/token.service";
import cookieService from "../services/cookie.service";
import { UploadedFile } from "express-fileupload";
import { IPublicUser } from "../interfaces/user.interface";

class UserController {

    async sendVerificationMessage(req: Request, res: Response, next: NextFunction) {
        try {
            const {
                user: { id },
            } = req;

            await userService.generateVerificationCode(id, true);

            res.sendStatus(200);

        } catch(e) {
            next(e);
        }
    }

    async verif(req: Request, res: Response, next: NextFunction) {
        try {
            const {
                user: { id },
                params: { verificationCode },
            } = req;

            await userService.verif(id, verificationCode);

            res.sendStatus(200);

        } catch(e) {
            next(e);
        }
    }

    async forgotPassword(req: Request, res: Response, next: NextFunction) {
        try {
            const {
                params: { email },
            } = req;

            await userService.forgotPassword(email, true);

            res.sendStatus(200);
        } catch(e) {
            res.sendStatus(200);
        }
    }

    async changePassword(req: Request, res: Response, next: NextFunction) {
        try {
            const {
                body: { email, code, password }
            } = req;

            const user = await userService.changePassword(email, code, password);
            const { accessToken, refreshToken } = await tokenService.generateAndBindTokens(user);

            cookieService.setRefreshToken(res, refreshToken);
            res.header('access-token', accessToken);

            res.json(user);
        } catch(e) {
            next(e);
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const {
                user: { id },
                body: { name, email, removeAvatar }
            } = req;

            const avatar = req.files?.avatar as UploadedFile;

            const user = await userService.update(id, name, email, avatar || !removeAvatar);

            res.sendStatus(200);
        } catch(e) {
            next(e);
        }
    }

    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const {
                user: { id },
                query: { s },
                headers: { _limit, _offset },
            } = req;

            const users = await userService.getAll(id, Number(_limit) || 10, Number(_offset) || 0, true, s as string) as IPublicUser[];

            res.json(users);
        } catch(e) {
            next(e);
        }
    }

}

export default new UserController;