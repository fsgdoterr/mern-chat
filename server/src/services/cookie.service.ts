import { Response } from "express";
import { TIME } from "../utils/const";

class CookieService {

    setRefreshToken(res: Response, refreshToken: string): void {
        res.cookie('refreshToken', refreshToken, {httpOnly: true, maxAge: 7 * TIME.DAY});
    }

    clearRefreshToken(res: Response): void {
        res.clearCookie('refreshToken');
    }

}

export default new CookieService;