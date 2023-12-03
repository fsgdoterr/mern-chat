import { NextFunction, Request, Response } from "express";
import userService from "../services/user.service";
import tokenService from "../services/token.service";
import cookieService from "../services/cookie.service";

class AuthController {

    async signup(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;

            const user = await userService.create(email, password, true);
            const { accessToken, refreshToken } = await tokenService.generateAndBindTokens(user);

            cookieService.setRefreshToken(res, refreshToken);
            res.header('access-token', accessToken);

            res.json(user);
        } catch(e) {
            next(e);
        }
    }

    async signin(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;

            const user = await userService.signin(email, password);
            const { accessToken, refreshToken } = await tokenService.generateAndBindTokens(user);

            cookieService.setRefreshToken(res, refreshToken);
            res.header('access-token', accessToken);

            res.json(user);
        } catch(e) {
            next(e);
        }
    }

    async refresh(req: Request, res: Response, next: NextFunction) {
        try {
            const { refreshToken } = req.cookies;

            const user = await userService.refresh(refreshToken);
            const { accessToken, refreshToken: newRefreshToken } = await tokenService.refresh(refreshToken);

            cookieService.setRefreshToken(res, newRefreshToken);
            res.header('access-token', accessToken);

            res.json(user);
        } catch(e) {
            next(e);
        }
    }
    
    async logout(req: Request, res: Response, next: NextFunction) {
        try {
            const { refreshToken } = req.cookies;

            await tokenService.removeToken(refreshToken);
            cookieService.clearRefreshToken(res);

            res.sendStatus(200);
        } catch(e) {
            next(e);
        }
    }

}

export default new AuthController();