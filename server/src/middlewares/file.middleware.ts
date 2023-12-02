import { NextFunction, Request, Response } from "express";
import { MIMETYPES } from "../utils/const";
import ApiError from "../utils/error";
import { prepareFileSize } from "../utils/helpers";

interface Options {
    [key: string]: {
        isArray: boolean;
        required?: boolean;
        maxSize?: number;
        mimetypes?: MIMETYPES[];
    }
}

export default (options: Options) => (req: Request, res: Response, next: NextFunction) => {

    for(let key in options) {
        const { isArray, required, maxSize, mimetypes } = options[key];
        const files = req.files?.[key];

        if(required && !files)
            throw ApiError.badRequest(`${key} is a required field`);

        if(files && Array.isArray(files)) {
            if(!isArray)
                throw ApiError.badRequest(`${key} must not be an array`);

            if(maxSize)
                files.forEach(file => {
                    if(file.size > maxSize)
                        throw ApiError.badRequest(`max file size is ${prepareFileSize(maxSize)}, but ${file.name} size is ${prepareFileSize(file.size)}`);
                })

            if(mimetypes && mimetypes.length)
                files.forEach(file => {
                    if(!mimetypes.includes(file.mimetype as MIMETYPES))
                        throw ApiError.badRequest(`allowed mimetypes is [${mimetypes.join(', ')}]`);
                })

        } else if(files && !Array.isArray(files)) {
            if(isArray)
                throw ApiError.badRequest(`${key} must be an array`);

            if(maxSize && files.size > maxSize)
                throw ApiError.badRequest(`max file size is ${prepareFileSize(maxSize)}, but ${files.name} size is ${prepareFileSize(files.size)}`);

            if(mimetypes && mimetypes.length && !mimetypes.includes(files.mimetype as MIMETYPES))
                throw ApiError.badRequest(`allowed mimetypes is [${mimetypes.join(', ')}]`);
        }
    }
    next();
}