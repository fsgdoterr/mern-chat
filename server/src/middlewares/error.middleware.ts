import { NextFunction, Request, Response } from "express";
import ApiError from "../utils/error";

export default (err: ApiError | Error, req: Request, res: Response, next: NextFunction) => {

    console.log(err);
    
    if(err instanceof ApiError) {
        return res.status(err.status).json({...err});
    }

    return res.status(500).json({
        status: 500,
        message: err.message,
        errors: [],
    });

}