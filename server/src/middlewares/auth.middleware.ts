import { NextFunction, Request, Response } from "express";
import ApiError from "../utils/error";
import tokenService from "../services/token.service";
import { IUser } from "../interfaces/user.interface";

declare global {
    namespace Express {
        interface Request {
            user: IUser;
        }
    }
}

export default (req: Request, res: Response, next: NextFunction) => {

    const header = req.headers.authorization;

    if(!header)
        throw ApiError.unauthorized();

    const token = header.split(' ')[1];

    if(!token)
        throw ApiError.unauthorized();

    const userData = tokenService.verifyAccess(token);

    if(!userData)
        throw ApiError.unauthorized();

    req.user = userData;

    next();
}